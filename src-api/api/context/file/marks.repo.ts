// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as path from "path";
import * as Rx from "rxjs";
import { readFile, writeFile } from "fs";
import { createHash } from "crypto";
import { appSettings } from "../../config/settings";
import { IMarksRepository } from "../../marks/marks.domain";
import { IMarksModel, IMarkModel } from "../../marks/marks.domain";
import { ITracer } from "../../../modules/tracer"

class MarksListRepo implements IMarksRepository {
  tracer: ITracer;
  // path relative to entry point
  marksDbPath: string = appSettings.marksDbPath;
  defaultModel = {
    version: "1.0.0",
    updated: "2016-08-10T21:18:04.432Z",
    data: []
  };

  marksDbSourceInternal = Rx.Observable.bindNodeCallback(readFile)(this.marksDbPath);

  loadMarks = (callback) => {
    let data: string = "";
    this.marksDbSourceInternal.subscribe(
      (buffer) => {
        data += buffer.toString("utf8");
      },
      (e) => {
        if (e.code !== "ENOENT") {
          throw e;
        }
        callback(JSON.stringify(this.defaultModel));
      },
      () => {
        callback(data);
      });
  }

  marksDbSource = Rx.Observable.bindCallback(this.loadMarks)();

  saveMarksDb = (data) => {
    return new Promise((resolve, reject) => {
      // Maintain updated value
      data.updated = (new Date()).toISOString();
      // Save to file
      writeFile(this.marksDbPath, JSON.stringify(data), (err) => {
        if (err) { reject(err); return; }
        resolve();
      });
    });
  }

  constructor(tracer: ITracer) {
    this.tracer = tracer
    this.tracer.info(`Marks file path ${this.marksDbPath}`);
  }

  getAll() {
    const getAllAsync = (resolve, reject) => {
      this.marksDbSource.subscribe(
        (x) => resolve(x),
        (e) => reject(e)
      );
    };
    return new Promise(getAllAsync);
  }

  get(id) {
    const getAsync = (resolve, reject) => {
      this.marksDbSource.subscribe(
        (x) => {
          // get JSON file as object, create Map() of data
          let obj = (typeof x !== "string") ? x : JSON.parse(String(x));
          obj.data = obj.data.filter((v) => v.id === id);
          resolve(obj);
        },
        (e) => {
          reject(e);
        }
      );
    };
    return new Promise(getAsync);
  }

  append(marks) {
    const appendAsync = (resolve, reject) => {
      this.marksDbSource.subscribe(
        (x) => {
          // get JSON file as object, create Map() of data
          let obj = (typeof x !== "string") ? x : JSON.parse(String(x));
          let objMap = new Map();
          // Map helps maintain unique entries
          obj.data.forEach((v) => objMap.set(v.id, v));

          // Ensure parameter is Array, rest of the code will be happy
          if (!Array.isArray(marks)) {
            marks = [marks];
          }

          marks.forEach((v) => {
            let hash = createHash("sha256");
            hash.update(v.url);
            // set id, created, and domain
            v.id = hash.digest("hex");
            let domain = v.url.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/i);
            if (domain) {
              v.domain = domain[0];
            }
            // add to map
            if (objMap.has(v.id)) {
              v.created = objMap.get(v.id).created;
              v.updated = (new Date()).toISOString();
            } else {
              v.created = (new Date()).toISOString();
            }
            objMap.set(v.id, v);
          });

          obj.data = Array.from(objMap.values());
          this.saveMarksDb(obj)
            .then(resolve)
            .catch(err => reject(err));

        },
        (e) => {
          reject(e);
        }
      );
    };
    return new Promise(appendAsync);
  }

  delete(marks) {

    return new Promise((resolve, reject) => {

      this.marksDbSource.subscribe(
        (x) => {
          // get JSON file as object, create Map() of data
          let obj = (typeof x !== "string") ? x : JSON.parse(String(x));
          let objMap = new Map();
          obj.data.forEach((v) => objMap.set(v.id, v));

          if (!Array.isArray(marks)) {
            marks = [marks];
          }

          marks.forEach((v) => objMap.delete(v));

          obj.data = Array.from(objMap.values());
          this.saveMarksDb(obj)
            .then(resolve)
            .catch(err => reject(err));

        },
        (e) => {
          reject(e);
        }
      );
    });
  }
}

export { MarksListRepo }

// simply output the file
// fs.createReadStream(marksDb, { flags: "r", encoding: "utf-8" })
//   .on("error", (err) => {
//     res.status(400).send(err);
//   }).pipe(res);