"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = require("../../modules/tracer");
const cmdline_1 = require("../../modules/cmdline");
const path = require("path");
const fs = require("fs");
let appDirectory;
let envPath = cmdline_1.cmdline.getArgValue(process.argv, "--env");
if (envPath === undefined) {
    appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));
    envPath = resolveApp("../.env");
}
else {
    envPath = path.resolve(envPath);
    appDirectory = path.dirname(envPath);
}
function resolveApp(relativePath) {
    let relativePathCleaned = path.join(...(relativePath.match(/([^\\\/])*/gi)));
    return path.resolve(appDirectory, relativePathCleaned);
}
console.log(`env path used ${envPath}`);
require('dotenv').config({ path: envPath });
const isRuntime = (mode) => {
    let runtimeMode = process.env.RUNTIME_MODE || "Development";
    return runtimeMode.toLowerCase() === mode.toLowerCase();
};
const isProduction = () => {
    return isRuntime("Production");
};
const getPort = () => {
    return parseInt((process.env.ONEMARK_API_PORT || "8081"));
};
const getOnemarkPath = () => {
    return resolveApp(process.env.ONEMARK_PATH || "./context/file/urls.json");
};
const appSettings = {
    isProduction: isProduction(),
    port: getPort(),
    bodyLimit: "100kb",
    marksDbPath: getOnemarkPath(),
    tracer: tracer_1.tracer
};
exports.appSettings = appSettings;
//# sourceMappingURL=settings.js.map