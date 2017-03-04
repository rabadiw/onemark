// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// BASE SETUP
// ==============================================

const express = require("express")
const bodyParser = require("body-parser")

class OnemarkApi {
  constructor() {
    let app = express()

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json({ limit: 300 }))

    // CORS
    // ==============================================
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })

    // ROUTES
    // ==============================================
    app.use("/", (req, res) => { res.send("Hello world!") })

    // START THE SERVER
    // ==============================================
    app.listen(3010, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`App running at http://localhost:3010`)
      }
    })
  }

  /** 
   * op
  */
  run(options) {

  }
}

exports.OnemarkApi = OnemarkApi
