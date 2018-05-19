// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { OnemarkServer, IExpressOptions } from "./onemark.server"
import { MarksRouter, IMarksRouterOption } from "./marks/marks.router"
import { ITracer } from "../modules/tracer";

interface IOnemarkServiceOption extends IExpressOptions {
  markDataPath: String
}

const OnemarkService = ({ tracer, port, bodyLimit, markDataPath }: IOnemarkServiceOption) => {

  let onemarkServerOption: IExpressOptions = { tracer: tracer, port: port, bodyLimit: bodyLimit }
  let marksRouterOption: IMarksRouterOption = { tracer: tracer, markDataPath: markDataPath }
  let envRes = { onemark_api_url: process.env.ONEMARK_API_URL, design_mode: process.env.DESIGN_MODE }
  let api = new OnemarkServer(onemarkServerOption)

  let options = {
    routes: [
      { template: "/api/marks", router: MarksRouter(marksRouterOption) },
      { template: "/api/env", router: ((req, res) => { res.json(envRes) }) },
      { template: "/", router: ((req, res) => { res.send("Onemark API!") }) }
    ]
  }

  return {
    run() {
      api.init().register(options).run()
    }
  }
}

export { OnemarkService, IOnemarkServiceOption }