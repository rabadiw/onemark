// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// BASE SETUP
// ==============================================

import { Express } from "@types/express"
import { Server } from "http"
import { OptionsJson } from "body-parser"

const express = require("express")
const bodyParser = require("body-parser")

interface IExpressOptions {
  trace: Function
  port: Number
  bodyLimit: String
}
interface IRouteOptions {
  template: string
  router: any
}

interface IRegisterOptions {
  routes: IRouteOptions[]
}

class OnemarkApi {
  bodyLimit: number | String
  port: Number
  server: Server
  trace: Function
  app: Express

  /**
   * create a new OnemarkApi object
   * @param options {trace: Function,port: Number,bodyLimit: String}
   */
  constructor(options: IExpressOptions) {
    let { trace, port, bodyLimit } = options
    this.trace = trace || ((msg) => { console.log(msg) })
    this.port = port || 3010
    this.bodyLimit = bodyLimit || 300
  }

  init() {
    this.app = express()

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: this.bodyLimit }))

    // CORS
    // ==============================================
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })

    return this
  }

  /**
   * register passed routes
   * @param options {routes:[{template: string, router: RouterHandler}]}
   */
  register(options: IRegisterOptions) {
    // ROUTES
    // ==============================================
    try {
      options.routes.forEach(v => {
        this.app.use(v.template, v.router)
      })
    } catch (e) {
      this.trace(`Building router table failed. ${e}`)
    }

    return this
  }

  /**
   * Run the app and start listening on requests
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