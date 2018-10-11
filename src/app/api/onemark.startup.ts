// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict"
import { ITracer } from "../modules/tracer";
import { OnemarkService } from "./onemark.service"

class OnemarkStartup {
  tracer: any;
  static init() {
    return new OnemarkStartup()
  }
  run() {
    let svcOption = {
      tracer: this.tracer,
      port: Number.parseInt(process.env.ONEMARK_API_PORT),
      bodyLimit: process.env.BODY_LIMIT,
      markDataPath: process.env.ONEMARK_DB_PATH
    }

    // ensure system is configured
    // this.configureSystem();

    OnemarkService(svcOption).run()
  }
  setTracer(tracer: ITracer) {
    this.tracer = tracer;
    return this;
  }
}

export { OnemarkStartup };