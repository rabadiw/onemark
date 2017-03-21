// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { OnemarkApi } from "./onemark-api"
import { MarksRouter } from "./marks/marks.router"
import { appSettings } from "./config/settings"
import { ITracer } from "../modules/tracer";

const OnemarkService = (tracer?: ITracer) => {
  tracer = tracer || appSettings.tracer
  let api = new OnemarkApi({
    port: appSettings.port,
    bodyLimit: appSettings.bodyLimit,
    tracer: tracer
  })
  let options = {
    routes: [
      { template: "/api/marks", router: MarksRouter(tracer) },
      { template: "/", router: ((req, res) => { res.send("Hello world!") }) }
    ]
  }

  return {
    run() {
      api.init().register(options).run()
    }
  }
}

export { OnemarkService }