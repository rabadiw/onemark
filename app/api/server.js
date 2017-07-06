"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./config/settings");
const onemark_service_1 = require("./onemark.service");
let svcOption = {
    tracer: settings_1.appSettings.tracer,
    port: settings_1.appSettings.port,
    bodyLimit: settings_1.appSettings.bodyLimit,
    markDataPath: settings_1.appSettings.marksDbPath
};
onemark_service_1.OnemarkService(svcOption).run();
//# sourceMappingURL=server.js.map