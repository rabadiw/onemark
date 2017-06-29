// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { ITracer, tracer } from "../../modules/tracer";
import { cmdline } from "../../modules/cmdline"

const path = require("path");
const fs = require("fs");

type RuntimeMode = "Production" | "Development"

// Set the path to root path of the app
// expected structure
// root
//    - domain
//    - context
let appDirectory: string
let envPath = cmdline.getArgValue(process.argv, "--env")
if (envPath === undefined) {
  appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));
  envPath = resolveApp("../.env")
} else {
  envPath = path.resolve(envPath)
  appDirectory = path.dirname(envPath)
}


function resolveApp(relativePath: string) {
  let relativePathCleaned = path.join(...(relativePath.match(/([^\\\/])*/gi)))
  return path.resolve(appDirectory, relativePathCleaned);
}

// note: follow app/api/config path
//let envPath = path.resolve(cmdline.getArgValue(process.argv, "--env")) || resolveApp("../.env")
console.log(`env path used ${envPath}`)
require('dotenv').config({ path: envPath })

const isRuntime = (mode: RuntimeMode) => {
  // code to test between dev or prod, update accordingly
  // let { argv } = (process || { argv: <string[]>[] })
  // const cmdDevPredicate = v => /^--dev$/.test(v)
  // return ((mode === "Development") && argv.some(cmdDevPredicate))
  let runtimeMode: string = process.env.RUNTIME_MODE || "Development"
  return runtimeMode.toLowerCase() === mode.toLowerCase()
}

const isProduction = () => {
  return isRuntime("Production")
}

const getPort = () => {
  return parseInt((process.env.ONEMARK_API_PORT || "8081"))
}

const getOnemarkPath = () => {
  return resolveApp(process.env.ONEMARK_PATH || "./context/file/urls.json")
}

const appSettings = {
  isProduction: isProduction(),
  port: getPort(),
  bodyLimit: "100kb",
  marksDbPath: getOnemarkPath(),
  tracer: tracer as ITracer
}

export { appSettings }