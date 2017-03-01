// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
const {uncaughtExceptionHandler, OnemarkApp} = require("./appController");
const {startup} = require("./startup");

const useApi = (args, next) => {
    console.log("OnemarkApi");
    const startupApi = (args) => { return args.indexOf("--run-api") !== -1 };
    if (startupApi(args)) {
        require("./api/index");
    } else {
        next();
    }
};

const useApp = (args, next) => {
    console.log("OnemarkApp");
    const app = new OnemarkApp();
};

const useDefault = (args, next) => {
    console.log("No app to start.");
}

// app init logic, i.e. uncaughtException
uncaughtExceptionHandler();

startup()
    .use(useApi)
    .use(useApp)
    .use(useDefault)
    .start(process.argv);
