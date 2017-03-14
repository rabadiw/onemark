import { OnemarkApi } from "./onemark-api"
import { MarksRouter } from "./marks/marks.router"
import { appSettings } from "./config/settings"

let api = new OnemarkApi({ port: appSettings.port })
let options = {
  routes: [
    { template: "/api/marks", router: MarksRouter },
    { template: "/", router: ((req, res) => { res.send("Hello world!") }) }
  ]
}
api.init(options).run()