// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { OnemarkApi } from "./onemark-api"
import { MarksRouter } from "./marks/marks.router"
import { appSettings } from "./config/settings"

const OnemarkService = (tracer) => {
  let api = new OnemarkApi({
    port: appSettings.port,
    bodyLimit: appSettings.bodyLimit,
    trace: tracer
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