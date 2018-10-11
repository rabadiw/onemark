// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.
/* Example:
    VERSION=1.0.0
    RUNTIME_MODE=Production
    DESIGN_MODE=false
    ONEMARK_API_URL=http://localhost:32801/
    ONEMARK_API_PORT=32801
    ONEMARK_DB_PATH=./data/urls.json
    ONEMARK_THEME=dark
    LOG_LEVEL=WARN
    ONEMARK_SETUP=1
*/
import { cmdline } from "./cmdline";
import { tracer } from "./tracer";
import * as electron from 'electron';
import * as path from "path";
import * as fs from "fs";

type RuntimeMode = "Production" | "Development"

const app = (electron && electron.app)
    ? electron.app || electron.remote.app
    : undefined

const isRuntime = (mode: RuntimeMode) => {
    let runtimeMode: string = process.env.RUNTIME_MODE || "Development"
    return runtimeMode.toLowerCase() === mode.toLowerCase()
}

const isProduction = () => {
    return isRuntime("Production")
}

const getAppPath = () => {
    let appRoot = "";
    if (undefined !== app) {
        // app.getAppPath();
        // ... puts us at app.asar
        appRoot = path.join(app.getAppPath(), "../..");
    } else {
        appRoot = path.join(__dirname, "..");
    }

    // go up one level
    return path.resolve(path.normalize(appRoot));
}

class envLoader {
    static init(args: string[]) {
        let envPath = cmdline.getArgValue(args, "--env");
        if (undefined === envPath) {
            // default to .env from root        
            envPath = path.resolve(path.normalize(`${getAppPath()}/.env`));
        }

        // will raise an uncaught exception
        const fstat = fs.statSync(envPath);
        if (!fstat.isFile()) {
            tracer.error(`invalid .env path`);
            return;
        }

        require('dotenv').config({ path: envPath });
        // customize 
        this.configExtra();
        this.configDbPath();
        this.configBuildDir();
    }
    private static configBuildDir(): any {
        const appPath = path.resolve(path.normalize(getAppPath()));
        process.env.ONEMARK_CONFIG_PATH = path.join(appPath, "config.sh");
        process.env.ONEMARK_UNCONFIG_PATH = path.join(appPath, "unconfig.sh");
    }

    private static configExtra() {
        process.env.BODY_LIMIT = "100kb";
    }

    private static configDbPath() {
        // e.g. ../../data/urls.json
        // or ./data/urls.json
        let dbpath = process.env.ONEMARK_DB_PATH;
        if (undefined === dbpath) {
            tracer.error(`no dbpath defined. Check your .env file.`);
            return;
        }
        if (isProduction() &&
            (undefined !== app) &&
            (!path.isAbsolute(process.env.ONEMARK_DB_PATH))) {
            //let contextPath = process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "Library/Preferences" : "/var/local")
            //return path.resolve(`${contextPath}/onemark/${dbpath}`)
            let userData = ""
            userData = app.getPath("userData");
            dbpath = path.join(userData, dbpath);
        }

        process.env.ONEMARK_DB_PATH =
            path.resolve(path.normalize(dbpath));
    }
}

export { envLoader };