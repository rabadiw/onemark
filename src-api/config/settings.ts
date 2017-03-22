import { ITracer, tracer } from "../tracer";
const path = require("path");
const fs = require("fs");

// Set the path to root path of the app
// expected structure
// root
//    - domain
//    - context
const appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const isDevMode = () => {
  let { argv } = (process || { argv: [] })
  return /--dev/.test(argv.join(" "))
}

const appSettings = {
  isProduction: !isDevMode(),
  port: (process.env.PORT || 3010),
  bodyLimit: "100kb",
  marksDbPath: resolveApp(path.join(...("./context/file/urls.json".split("/")))),
  tracer: tracer as ITracer
}

export { appSettings }