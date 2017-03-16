"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onemark_api_1 = require("./onemark-api");
const marks_router_1 = require("./marks/marks.router");
const settings_1 = require("./config/settings");
const tracer = (msg) => { console.log(msg); };
let api = new onemark_api_1.OnemarkApi({
    port: settings_1.appSettings.port,
    bodyLimit: settings_1.appSettings.bodyLimit,
    trace: tracer
});
let options = {
    routes: [
        { template: "/api/marks", router: marks_router_1.MarksRouter },
        { template: "/", router: ((req, res) => { res.send("Hello world!"); }) }
    ]
};
api.init().register(options).run();
//# sourceMappingURL=server.js.map