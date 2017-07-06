// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// BASE SETUP
// ==============================================

import { Express } from "express"
import { Server } from "http"
import { ITracer } from "../modules/tracer"

const express = require("express")
const bodyParser = require("body-parser")

interface IExpressOptions {
  bodyLimit: String
  port: Number
  tracer: ITracer
}
interface IRouteOptions {
  router: any
  template: string
}
interface IRegisterOptions {
  routes: IRouteOptions[]
}

class OnemarkApi {
  app: Express
  bodyLimit: Number | String
  port: Number
  server: Server
  tracer: ITracer

  /**
   * create a new OnemarkApi object
   * @param options {trace: Function,port: Number,bodyLimit: String}
   */
  constructor({ tracer, port, bodyLimit }: IExpressOptions) {
    this.tracer = tracer || { info: (msg) => { console.log(msg) } } as ITracer
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
      this.tracer.info(`Building router table failed. ${e}`)
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
        this.tracer.info(err)
      }
    })
    this.tracer.info(`App running at http://${this.server.address().address}:${this.server.address().port}`)
  }
}

export { OnemarkApi, IExpressOptions, IRouteOptions, IRegisterOptions }