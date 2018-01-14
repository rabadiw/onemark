// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { AppConfig } = require("./api/config/settings")
const { tracer } = require("./modules/tracer")
const { cmdline } = require("./modules/cmdline")
const { OnemarkApp } = require("./onemark-app")
const { OnemarkService } = require("./api/onemark.service")
//const { squirrelStartup } = require("./squirrelStartup")
const { startup } = require("./modules/startup")
const path = require("path")

// handle uncaught exceptions
process.on('uncaughtException', (e) => OnemarkApp.uncaughtExceptionHandler(e))

let appSettings = {}

const useEnv = (args, next) => {
    const configureDarwin = () => {
        // OSX only
        if (false === /^darwin/.test(process.platform)) { return }

        if (process.env.ONEMARK_SETUP === 1) {
            setup()
        }
    }
    const configureLinux = () => {
        // linux based distro only
        if (false === /^linux/.test(process.platform)) { return }
        if (process.env.ONEMARK_SETUP === 1) {
            setup()
        }
    }
    const setup = () => {
        const { exec } = require('child_process');
        const fs = require("fs")

        let setupFile = appSettings.configPath()
        if (fs.existsSync(setupFile)) {
            exec(setupFile, (err, stdout, stderr) => {
                if (err) {
                    console.log(`stderr: ${stderr}`);
                    // node couldn't execute the command
                    return;
                }
            });
        }
    }

    // .env should always be at root with main.js
    appSettings = AppConfig.loadEnvironment().loadSettings()

    //require('dotenv').config({ path: appSettings.envPath() })
    tracer.info(`Running in ${process.env.RUNTIME_MODE} mode`)

    tracer.info(`ONEMARK_SETUP: ${process.env.ONEMARK_SETUP}`)
    tracer.info(`appsettings: ${JSON.stringify(appSettings)}`)
    tracer.info(`envpath: ${appSettings.envPath}`)
    tracer.info(`configPath: ${appSettings.configPath}`)

    // darwin
    configureDarwin()
    configureLinux()

    next()
}

// const useSquirrel = (args, next) => {
//     // squirrelStartup module will call app.quit()
//     // if passed argv are squirrel commands
//     if (!squirrelStartup(args)) {
//         next()
//     } else {
//         tracer.info("install completed!");
//     }
// }

const useApi = (args, next) => {
    //const startupApi = (args) => { return /--run-api/.test(args) }
    const startupApi = (args) => { return cmdline.getArgValue(args, "--start") === "api" }
    if (startupApi(args)) {
        let svcOption = {
            tracer: tracer,
            port: appSettings.port,
            bodyLimit: appSettings.bodyLimit,
            markDataPath: appSettings.marksDbPath
        }
        OnemarkService(svcOption).run()
    } else {
        next()
    }
}

// eslint-disable-next-line no-unused-vars
const useApp = (args, next) => {
    new OnemarkApp()
}

// build startup 
// different startup options
//   -- squirrel (maybe)
//   -- api
//   -- app
startup()
    .use(useEnv)
    //.use(useSquirrel)
    .use(useApi)
    .use(useApp)
    .start(process.argv)
