// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// BASE SETUP
// ==============================================

import { Express } from "@types/express";
import { Server } from "http";

const express = require("express")
const bodyParser = require("body-parser")

class OnemarkApi {
  port: number;
  server: Server;
  trace: Function;
  app: Express;

  constructor(options) {
    let { trace, port } = options
    this.trace = trace || ((msg) => { console.log(msg) })
    this.port = port || 3010
  }

  init(options: any) {
    this.app = express()

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: 300 }))

    // CORS
    // ==============================================
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })

    // ROUTES
    // ==============================================
    try {
      options.routes.forEach(v => {
        this.app.use(v.template, v.router)
      })
    } catch (e) {
      this.trace(`Building router table failed. ${e}`)
    }

    return this;
  }

  /**
   * Run the app and start listening on requests
   * @param options { port: int, host: string }
   */
  run() {
    // START THE SERVER
    // ==============================================
    this.server = this.app.listen(this.port, (err) => {
      if (err) {
        this.trace(err)
      }
    })
    this.trace(`App running at http://${this.server.address().address}:${this.server.address().port}`)
  }
}

export { OnemarkApi }