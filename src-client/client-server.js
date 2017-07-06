"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
//const sqlite = require("sql.js");

class cmdline {
  static getArg(args, argName) {
    const regex = new RegExp(`^${argName}[=]?`);
    const cmdDevPredicate = v => regex.test(v);
    return args.find(cmdDevPredicate);
  }
  static getArgValue(args, argName) {
    let v = this.getArg(args, argName);
    if (v !== undefined && v.indexOf('=') > 0) {
      return this.getArg(args, argName).split('=')[1];
    }
    return undefined;
  }
}

class serverConfig {

  constructor(rootDir) {
    this.appDirectory = rootDir;
    console.log(`App Dir path ${this.appDirectory}`)
  }

  resolveApp(relativePath) {
    let relativePathCleaned = path.join(...(relativePath.match(/([^\\\/])*/gi)))
    return path.resolve(this.appDirectory, relativePathCleaned);
  }

  loadEnvironment() {
    let envPath = cmdline.getArgValue(process.argv, "--env")
    if (envPath === undefined) {
      envPath = this.resolveApp("../.env")
    } else {
      envPath = path.resolve(envPath)
    }

    console.log(`env path used ${envPath}`)
    require('dotenv').config({ path: envPath })
  }
}
// Set root directory
let rootDir = fs.realpathSync(path.resolve(__filename, "../"))
let config = new serverConfig(rootDir)
config.loadEnvironment()

//const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");
//const db = new sqlite.Database(filebuffer);
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV !== "production") {
  app.use(express.static("client/build"));
}

// const COLUMNS = [
//   "carbohydrate_g",
//   "protein_g",
//   "fa_sat_g",
//   "fa_mono_g",
//   "fa_poly_g",
//   "kcal",
//   "description"
// ];
// app.get("/api/food", (req, res) => {
//   const param = req.query.q;

//   if (!param) {
//     res.json({
//       error: "Missing required parameter `q`"
//     });
//     return;
//   }

//   // WARNING: Not for production use! The following statement
//   // is not protected against SQL injections.
//   const r = db.exec(
//     `
//     select ${COLUMNS.join(", ")} from entries
//     where description like '%${param}%'
//     limit 100
//   `
//   );

//   if (r[0]) {
//     res.json(
//       r[0].values.map(entry => {
//         const e = {};
//         COLUMNS.forEach((c, idx) => {
//           // combine fat columns
//           if (c.match(/^fa_/)) {
//             e.fat_g = e.fat_g || 0.0;
//             e.fat_g = (parseFloat(e.fat_g, 10) +
//               parseFloat(entry[idx], 10)).toFixed(2);
//           } else {
//             e[c] = entry[idx];
//           }
//         });
//         return e;
//       })
//     );
//   } else {
//     res.json([]);
//   }
// });

app.get("/api/env", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  res.json({
    onemark_api_url: process.env.ONEMARK_API_URL,
    design_mode: process.env.DESIGN_MODE
  })
})

app.listen(app.get("port"), () => {
  console.log(`Navigate: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});