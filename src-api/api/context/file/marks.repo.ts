// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as path from "path";

import { createHash } from "crypto";
import { IMarksRepository } from "../../marks/marks.domain";
import { IMarksModel, IMarkModel } from "../../marks/marks.domain";
import { ITracer } from "../../../modules/tracer"
import { Observable } from "rxjs";
import MarkFileDb from "./markFileDb";

interface IMarksListRepoOption {
  tracer: ITracer,
  markDataPath: String
}

class MarksListRepo implements IMarksRepository {
  tracer: ITracer;
  marksFileDb: MarkFileDb;
  marksDbPath: String;
  marksDbSource$: Observable<IMarksModel>;

  constructor({ tracer, markDataPath }: IMarksListRepoOption) {
    this.tracer = tracer
    this.tracer.info(`Marks file path ${this.marksDbPath}`)
    this.marksDbPath = markDataPath
    this.marksFileDb = new MarkFileDb(tracer, this.marksDbPath)
    this.marksDbSource$ = this.marksFileDb.createRx()
  }

  getAll() {
    const getAllAsync = (resolve, reject) => {
      this.marksDbSource$.subscribe(
        (x) => resolve(x),
        (e) => reject(e)
      );
    };
    return new Promise(getAllAsync);
  }

  get(id) {
    const getAsync = (resolve, reject) => {
      this.marksDbSource$.subscribe(
        (x) => {
          // return requested item as item in array of data
          let obj = <IMarksModel>{
            version: x.version,
            updated: x.updated,
            data: <[IMarkModel]>(x.data.filter((v) => v.id === id))
          };
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
    const createId = (v: string) => {
      let hash = createHash("sha256");
      hash.update(v);
      // set id, created, and domain
      return hash.digest("hex");
    }
    const getDomain = (v: string) => {
      let domain = v.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/i);
      if (domain) {
        return domain[0];
      }
      return ""
    }

    const appendAsync = (resolve, reject) => {
      this.marksDbSource$.subscribe(
        (x) => {
          let objMap = new Map();
          // Map helps maintain unique entries
          x.data.forEach((v) => objMap.set(v.id, v));

          // Ensure parameter is Array, rest of the code will be happy
          if (!Array.isArray(marks)) {
            marks = [marks];
          }

          // append/update entries  
          marks.forEach((v) => {
            // set id, created, and domain
            v.id = createId(v.url);
            v.domain = getDomain(v.url);
            // add to map
            if (objMap.has(v.id)) {
              let curObj = objMap.get(v.id);
              v.created = curObj.created;
              v.updated = (new Date()).toISOString();
            } else {
              v.created = (new Date()).toISOString();
            }
            objMap.set(v.id, v);
          });

          // Persist new object model to disk
          let obj = <IMarksModel>{
            version: x.version,
            updated: (new Date()).toISOString(),
            data: Array.from(objMap.values())
          };
          this.marksFileDb.saveMarksDb(obj)
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

      this.marksDbSource$.subscribe(
        (x) => {
          // get JSON file as object, create Map() of data
          let objMap = new Map();
          x.data.forEach((v) => objMap.set(v.id, v));

          if (!Array.isArray(marks)) {
            marks = [marks];
          }

          marks.forEach((v) => objMap.delete(v));

          // Persist new object model to disk
          let obj = <IMarksModel>{
            version: x.version,
            updated: (new Date()).toISOString(),
            data: Array.from(objMap.values())
          };
          this.marksFileDb.saveMarksDb(obj)
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

export { MarksListRepo, IMarksListRepoOption }
