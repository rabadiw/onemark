import { ITracer, tracer } from "../../modules/tracer";
const path = require("path");
const fs = require("fs");

type RuntimeMode = "Production" | "Development"

// Set the path to root path of the app
// expected structure
// root
//    - domain
//    - context
const appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));

function resolveApp(relativePath) {
  let relativePathCleaned = path.join(...(relativePath.match(/([^\\\/])*/g)))
  return path.resolve(appDirectory, relativePathCleaned);
}

// note: follow app/api/config path
require('dotenv').config({ path: resolveApp(path.join("..", ".env")) })

const isRuntime = (mode: RuntimeMode) => {
  // code to test between dev or prod, update accordingly
  // let { argv } = (process || { argv: <string[]>[] })
  // const cmdDevPredicate = v => /^--dev$/.test(v)
  // return ((mode === "Development") && argv.some(cmdDevPredicate))
  let runtimeMode: string = process.env.RUNTIME_MODE || "Development"
  return runtimeMode.toLowerCase() === mode.toLowerCase()
}

const getPort = () => {
  return (process.env.ONEMARK_PORT || 3010)
}

const getOnemarkPath = () => {
  return resolveApp(path.join(...((process.env.ONEMARK_PATH || "./context/file/urls.json").split("/"))))
}

const appSettings = {
  isProduction: isRuntime("Production"),
  port: getPort(),
  bodyLimit: "100kb",
  marksDbPath: getOnemarkPath(),
  tracer: tracer as ITracer
}

export { appSettings }