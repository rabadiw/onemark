// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
const {uncaughtExceptionHandler, OnemarkApp} = require("./OnemarkApp")
const {startup} = require("./startup")

const useApi = (args, next) => {
    const startupApi = (args) => { return args.indexOf("--run-api") !== -1 }
    if (startupApi(args)) {
        require("./api/index")
    } else {
        next()
    }
}

const useApp = (args, next) => {
    new OnemarkApp()
}

// handle uncaught exceptions
uncaughtExceptionHandler()

// build startup 
// different startup options
//   -- api
//   -- app
//   -- squirell (maybe)
startup()
    .use(useApi)
    .use(useApp)
    .start(process.argv)
