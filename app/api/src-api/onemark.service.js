"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onemark_api_1 = require("./onemark-api");
const marks_router_1 = require("./marks/marks.router");
const settings_1 = require("./config/settings");
const OnemarkService = (tracer) => {
    tracer = tracer || settings_1.appSettings.tracer;
    let api = new onemark_api_1.OnemarkApi({
        port: settings_1.appSettings.port,
        bodyLimit: settings_1.appSettings.bodyLimit,
        tracer: tracer
    });
    let options = {
        routes: [
            { template: "/api/marks", router: marks_router_1.MarksRouter(tracer) },
            { template: "/", router: ((req, res) => { res.send("Hello world!"); }) }
        ]
    };
    return {
        run() {
            api.init().register(options).run();
        }
    };
};
exports.OnemarkService = OnemarkService;
//# sourceMappingURL=onemark.service.js.map