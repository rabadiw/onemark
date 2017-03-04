// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { OnemarkApp, uncaughtExceptionHandler } = require("./onemark-app")
const { OnemarkApi } = require("./api/onemark-api")
const { startup } = require("./lib/startup")

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

// handle uncaught exceptions
uncaughtExceptionHandler()

// build startup 
// different startup options
//   -- api
//   -- app
//   -- squirrel (maybe)
startup()
    .use(useApi)
    .use(useApp)
    .start(process.argv)
