"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = require("../../modules/tracer");
const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));
function resolveApp(relativePath) {
    let relativePathCleaned = path.join(...(relativePath.match(/([^\\\/])*/gi)));
    return path.resolve(appDirectory, relativePathCleaned);
}
require('dotenv').config({ path: resolveApp("../.env") });
const isRuntime = (mode) => {
    let runtimeMode = process.env.RUNTIME_MODE || "Development";
    return runtimeMode.toLowerCase() === mode.toLowerCase();
};
const getPort = () => {
    return (process.env.ONEMARK_PORT || 3010);
};
const getOnemarkPath = () => {
    return resolveApp(process.env.ONEMARK_PATH || "./context/file/urls.json");
};
const appSettings = {
    isProduction: isRuntime("Production"),
    port: getPort(),
    bodyLimit: "100kb",
    marksDbPath: getOnemarkPath(),
    tracer: tracer_1.tracer
};
exports.appSettings = appSettings;
//# sourceMappingURL=settings.js.map