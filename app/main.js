// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { log } = require("electron-log");
const { OnemarkApp } = require("./onemark-app")
const { OnemarkService } = require("./api/onemark.service")
const { startup } = require("./lib/startup")

// handle uncaught exceptions
process.on('uncaughtException', (e) => OnemarkApp.uncaughtExceptionHandler(e))

const useApi = (args, next) => {
    const startupApi = (args) => { return /--run-api/.test(args) }
    if (startupApi(args)) {
        const tracer = {
            info: (msg) => { log.info(msg) },
            warn: (msg) => { log.warn(msg) },
            error: (msg) => { log.error(msg) },
            success: (msg) => { log.info(msg) },
        }
        OnemarkService(tracer).run()
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
//   -- api
//   -- app
//   -- squirrel (maybe)
startup()
    .use(useApi)
    .use(useApp)
    .start(process.argv)
