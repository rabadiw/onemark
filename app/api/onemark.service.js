"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onemark_api_1 = require("./onemark-api");
const marks_router_1 = require("./marks/marks.router");
const OnemarkService = ({ tracer, port, bodyLimit, markDataPath }) => {
    let onemarkApiOption = { tracer: tracer, port: port, bodyLimit: bodyLimit };
    let marksRouterOption = { tracer: tracer, markDataPath: markDataPath };
    let envRes = { onemark_api_url: process.env.ONEMARK_API_URL, design_mode: process.env.DESIGN_MODE };
    let api = new onemark_api_1.OnemarkApi(onemarkApiOption);
    let options = {
        routes: [
            { template: "/api/marks", router: marks_router_1.MarksRouter(marksRouterOption) },
            { template: "/api/env", router: ((req, res) => { res.json(envRes); }) },
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