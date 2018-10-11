// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { tracer } = require("./modules/tracer")
const { cmdline } = require("./modules/cmdline")
const { envLoader, envSetup } = require("./modules/envLoader")
const { OnemarkApp } = require("./onemark-app")
//const { squirrelStartup } = require("./squirrelStartup")
const { startup } = require("./modules/startup")
const { OnemarkStartup } = require("./api/onemark.startup")

// handle uncaught exceptions
process.on('uncaughtException', (e) => OnemarkApp.uncaughtExceptionHandler(e))

const useEnv = (args, next) => {
    // .env should always be at root with main.js
    // load .env
    envLoader.init(args);
    tracer.info(`Running in ${process.env.RUNTIME_MODE} mode`)

    envSetup.ensureSetup();

    if (next) {
        next()
    }
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

const startupApi = (args) => { return cmdline.getArgValue(args, "--start") === "api" }
const useApi = (args, next) => {
    if (startupApi(args)) {
        OnemarkStartup
            .init()
            .setTracer(tracer)
            .run();
    }

    if (next) {
        next()
    }
}

// eslint-disable-next-line no-unused-vars
const isDarwin = () => { return ((/^darwin/.test(process.platform))) };
const useApp = (args, next) => {
    let options = {}
    if (!isDarwin() && startupApi(args)) {
        options = { hidden: true }
    }
    new OnemarkApp(options)

    if (next) {
        next();
    }
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
