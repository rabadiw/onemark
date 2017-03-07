// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { OnemarkApp } = require("./onemark-app")
const { OnemarkApi } = require("./api/onemark-api")
const { startup } = require("./lib/startup")

// handle uncaught exceptions
process.on('uncaughtException', (e) => OnemarkApp.uncaughtExceptionHandler(e))

const useApi = (args, next) => {
    const startupApi = (args) => { return /--run-api/.test(args) }
    if (startupApi(args)) {
        new OnemarkApi()
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
