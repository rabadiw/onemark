// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { OnemarkServer, IExpressOptions } from "./onemark.server"
import { MarksRouter, IMarksRouterOption } from "./marks/marks.router"

interface IOnemarkServiceOption extends IExpressOptions {
  markDataPath: String
}

const OnemarkService = ({ tracer, port, bodyLimit, markDataPath }: IOnemarkServiceOption) => {

  let onemarkServerOption: IExpressOptions = { tracer: tracer, port: port, bodyLimit: bodyLimit }
  let marksRouterOption: IMarksRouterOption = { tracer: tracer, markDataPath: markDataPath }
  let envRes = { onemark_endpoint: process.env.ONEMARK_API_URL, design_mode: process.env.DESIGN_MODE }
  let rootRes = { service_name: "Onemark API", version: process.env.VERSION }
  let api = new OnemarkServer(onemarkServerOption)

  let options = {
    routes: [
      { template: "/api/marks", router: MarksRouter(marksRouterOption) },
      { template: "/api/env", router: ((req, res) => { res.json(envRes) }) },
      { template: "/", router: ((req, res) => { res.json(rootRes) }) }
    ]
  }

  return {
    run() {
      api.init().register(options).run()
    }
  }
}

export { OnemarkService, IOnemarkServiceOption }