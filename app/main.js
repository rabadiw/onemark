// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { tracer } = require("./modules/tracer")
const { OnemarkApp } = require("./onemark-app")
const { OnemarkService } = require("./api/onemark.service")
//const { squirrelStartup } = require("./squirrelStartup")
const { startup } = require("./modules/startup")

// handle uncaught exceptions
process.on('uncaughtException', (e) => OnemarkApp.uncaughtExceptionHandler(e))

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
    const startupApi = (args) => { return /--run-api/.test(args) }
    if (startupApi(args)) {
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
//   -- squirrel (maybe)
//   -- api
//   -- app
startup()
    //.use(useSquirrel)
    .use(useApi)
    .use(useApp)
    .start(process.argv)
