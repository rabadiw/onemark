import { Observable } from "rxjs";
import { readFile, writeFile } from "fs";
import { ITracer } from "../../../modules/tracer"
import { IMarksModel } from "../../marks/marks.domain"

const DefaultModel = {
  version: "1.0.0",
  updated: "2016-08-10T21:18:04.432Z",
  data: []
};

class MarkFileDb {
  tracer: ITracer;
  marksDbPath: String;

  constructor(tracer: ITracer, dbpath: String) {
    this.tracer = tracer
    this.marksDbPath = dbpath
  }

  saveMarksDb = (data) => {
    return new Promise((resolve, reject) => {
      // Maintain updated value
      data.updated = (new Date()).toISOString();
      // Save to file
      writeFile(this.marksDbPath.toString(), JSON.stringify(data), (err) => {
        if (err) { reject(err); return; }
        resolve();
      });
    });
  }

  loadMarks = (filename: string, callback: (err: NodeJS.ErrnoException, data: string) => void) => {
    readFile(filename, { encoding: "utf8" }, (err, content) => {
      if (err) {
        this.tracer.info(`loadMarks error ${JSON.stringify(err)}`)
        callback(err, JSON.stringify(DefaultModel));
      }
      callback(null, content)
    })
  }

  createRx = (): Observable<IMarksModel> => {
    return Observable.create((observer) => {

      let nextItem = () => (eventType, filename) => {
        this.loadMarks(filename, (err, data) => {
          if (err) {
            observer.error(err)
          }
          observer.next(JSON.parse(data))
        })
      }

      nextItem()("load", this.marksDbPath)

      return () => { }
    })
  }
}

export default MarkFileDb
export { DefaultModel }