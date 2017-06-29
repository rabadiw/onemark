"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("rxjs");
const fs_1 = require("fs");
const crypto_1 = require("crypto");
const settings_1 = require("../../config/settings");
const defaultModel = {
    version: "1.0.0",
    updated: "2016-08-10T21:18:04.432Z",
    data: []
};
class MarksListRepo {
    constructor(tracer) {
        this.loadMarks = (callback) => {
            let data = "";
            this.marksDbSourceInternal.subscribe((buffer) => {
                data += buffer.toString("utf8");
            }, (e) => {
                if (e.code !== "ENOENT") {
                    throw e;
                }
                callback(JSON.stringify(defaultModel));
            }, () => {
                callback(data);
            });
        };
        this.saveMarksDb = (data) => {
            return new Promise((resolve, reject) => {
                data.updated = (new Date()).toISOString();
                fs_1.writeFile(this.marksDbPath, JSON.stringify(data), (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        };
        this.marksDbPath = settings_1.appSettings.marksDbPath;
        this.marksDbSourceInternal = Rx.Observable.bindNodeCallback(fs_1.readFile)(this.marksDbPath);
        this.marksDbSource = Rx.Observable.bindCallback(this.loadMarks)();
        this.tracer = tracer;
        this.tracer.info(`Marks file path ${this.marksDbPath}`);
    }
    getAll() {
        this.marksDbSource.publishReplay();
        const getAllAsync = (resolve, reject) => {
            this.marksDbSource.subscribe((x) => resolve(x), (e) => reject(e));
        };
        return new Promise(getAllAsync);
    }
    get(id) {
        const getAsync = (resolve, reject) => {
            this.marksDbSource.subscribe((x) => {
                let obj = (typeof x !== "string") ? x : JSON.parse(String(x));
                obj.data = obj.data.filter((v) => v.id === id);
                resolve(obj);
            }, (e) => {
                reject(e);
            });
        };
        return new Promise(getAsync);
    }
    append(marks) {
        const appendAsync = (resolve, reject) => {
            this.marksDbSource.subscribe((x) => {
                let obj = (typeof x !== "string") ? x : JSON.parse(String(x));
                let objMap = new Map();
                obj.data.forEach((v) => objMap.set(v.id, v));
                if (!Array.isArray(marks)) {
                    marks = [marks];
                }
                marks.forEach((v) => {
                    let hash = crypto_1.createHash("sha256");
                    hash.update(v.url);
                    v.id = hash.digest("hex");
                    let domain = v.url.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/i);
                    if (domain) {
                        v.domain = domain[0];
                    }
                    if (objMap.has(v.id)) {
                        v.created = objMap.get(v.id).created;
                        v.updated = (new Date()).toISOString();
                    }
                    else {
                        v.created = (new Date()).toISOString();
                    }
                    objMap.set(v.id, v);
                });
                obj.data = Array.from(objMap.values());
                this.saveMarksDb(obj)
                    .then(resolve)
                    .catch(err => reject(err));
            }, (e) => {
                reject(e);
            });
        };
        return new Promise(appendAsync);
    }
    delete(marks) {
        return new Promise((resolve, reject) => {
            this.marksDbSource.subscribe((x) => {
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
            }, (e) => {
                reject(e);
            });
        });
    }
}
exports.MarksListRepo = MarksListRepo;
//# sourceMappingURL=marks.repo.js.map