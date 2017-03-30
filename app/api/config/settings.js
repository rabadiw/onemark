"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = require("../../modules/tracer");
const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}
const isDevMode = () => {
    let { argv } = (process || { argv: [] });
    return argv.filter(v => /--dev/.test(v))[0];
};
const appSettings = {
    isProduction: !isDevMode(),
    port: (process.env.PORT || 3010),
    bodyLimit: "100kb",
    marksDbPath: resolveApp(path.join(...("./context/file/urls.json".split("/")))),
    tracer: tracer_1.tracer
};
exports.appSettings = appSettings;
//# sourceMappingURL=settings.js.map