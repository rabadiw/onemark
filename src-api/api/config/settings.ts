// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { ITracer, tracer } from "../../modules/tracer";
import { cmdline } from "../../modules/cmdline";

const electron = require('electron');
const path = require("path");
const fs = require("fs");

type RuntimeMode = "Production" | "Development"

const app = (electron && electron.app)
  ? electron.app || electron.remote.app
  : undefined

const pathNormalize = (fspath) => {
  if (undefined === fspath) return
  return path.normalize(path.join(...(fspath.match(/([^\\\/])*/gi))))
}

const isRuntime = (mode: RuntimeMode) => {
  let runtimeMode: string = process.env.RUNTIME_MODE || "Development"
  return runtimeMode.toLowerCase() === mode.toLowerCase()
}

const isProduction = () => {
  return isRuntime("Production")
}

const getPort = () => {
  return parseInt((process.env.ONEMARK_API_PORT || "3081"))
}

const pathResolver = () => {
  // Set the path to root path of the app
  // expected structure
  // root
  //    - domain
  //    - context
  let appDirectory: string
  appDirectory = fs.realpathSync(path.resolve(__filename, "../../"));
  if (isProduction()) {
    appDirectory = process.cwd()
  }
  return {
    resolve: (relativePath: string) => {
      let relativePathCleaned = pathNormalize(relativePath)
      return path.resolve(appDirectory, relativePathCleaned);
    }
  }
}
// logically should be here
let appPathResolver = pathResolver()

const getOnemarkPath = () => {
  let dbpath = process.env.ONEMARK_PATH //|| "../../data/urls.json"
  if (isProduction()) {
    //let contextPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "Library/Preferences" : "/var/local")
    //return path.resolve(`${contextPath}/onemark/${dbpath}`)

    let userData = ""
    if (app) {
      app.getPath("userData")
    }
    return path.normalize(path.join(userData, dbpath))
  }
  return appPathResolver.resolve(dbpath)
}

const getConfigPath = () => {
  let configpath = "../../build"
  if (isProduction()) {
    configpath = ""
  }
  return appPathResolver.resolve(path.join(configpath, "config.sh"))
}

const getEnvPath = () => {
  let envPath = cmdline.getArgValue(process.argv, "--env")
  if (undefined === envPath) {
    envPath = appPathResolver.resolve("../.env")
  } else {
    envPath = path.resolve(pathNormalize(envPath))
  }
  return envPath
}

const appSettings = {
  isProduction: isProduction(),
  port: getPort(),
  bodyLimit: "100kb",
  tracer: tracer as ITracer,
  marksDbPath: getOnemarkPath,
  configPath: getConfigPath,
  envPath: getEnvPath
}

class AppConfig {
  static loadEnvironment() {
    require('dotenv').config({ path: getEnvPath() })
    return this
  }
  static loadSettings() {
    const settings = {
      isProduction: isProduction(),
      port: getPort(),
      bodyLimit: "100kb",
      tracer: tracer as ITracer,
      marksDbPath: getOnemarkPath(),
      configPath: getConfigPath(),
      envPath: getEnvPath()
    }
    return settings
  }
}

export { AppConfig }