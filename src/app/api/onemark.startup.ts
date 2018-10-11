// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict"
import { ITracer } from "../modules/tracer";
import { OnemarkService } from "./onemark.service"

class OnemarkStartup {
  tracer: any;
  configureSystem() {

    const isDarwinOrLinux = () => {
      return ((/^darwin|^linux/.test(process.platform)))
    }

    const setup = () => {
      const { exec } = require('child_process')
      const fs = require("fs")

      let configfile = process.env.ONEMARK_CONFIG_PATH;
      this.tracer.info(`Config.sh path ${configfile}`)

      if (fs.existsSync(configfile)) {
        exec(configfile, (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            this.tracer.info(`stderr: ${stderr}`)
            return
          } else {
            // plist will launch a new agent
            // exit this one
            process.exit()
          }
        })
      }
    }

    // OSX only
    // linux based distro only
    if (!isDarwinOrLinux()) { return }

    if (process.env.ONEMARK_SETUP === "1") {
      setup()
    }
  }

  unconfigure() {
    const { exec } = require('child_process')
    const fs = require("fs")

    let unconfigfile = process.env.ONEMARK_UNCONFIG_PATH;
    this.tracer.info(`Config.sh path ${unconfigfile}`)

    if (fs.existsSync(unconfigfile)) {
      exec(unconfigfile, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          this.tracer.info(`stderr: ${stderr}`)
          return
        }
      })
    }
  }

  run() {
    let svcOption = {
      tracer: this.tracer,
      port: Number.parseInt(process.env.ONEMARK_API_PORT),
      bodyLimit: process.env.BODY_LIMIT,
      markDataPath: process.env.ONEMARK_DB_PATH
    }

    // ensure system is configured
    this.configureSystem();

    OnemarkService(svcOption).run()
  }

  setTracer(tracer: ITracer) {
    this.tracer = tracer;
    return this;
  }

  static init() {
    return new OnemarkStartup()
  }
}

export { OnemarkStartup };