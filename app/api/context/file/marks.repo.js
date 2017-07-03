"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const settings_1 = require("../../config/settings");
const markFileDb_1 = require("./markFileDb");
class MarksListRepo {
    constructor(tracer) {
        this.marksDbPath = settings_1.appSettings.marksDbPath;
        this.tracer = tracer;
        this.tracer.info(`Marks file path ${this.marksDbPath}`);
        this.marksFileDb = new markFileDb_1.default(tracer, this.marksDbPath);
        this.marksDbSource$ = this.marksFileDb.createRx();
    }
    getAll() {
        const getAllAsync = (resolve, reject) => {
            this.marksDbSource$.subscribe((x) => resolve(x), (e) => reject(e));
        };
        return new Promise(getAllAsync);
    }
    get(id) {
        const getAsync = (resolve, reject) => {
            this.marksDbSource$.subscribe((x) => {
                let obj = {
                    version: x.version,
                    updated: x.updated,
                    data: (x.data.filter((v) => v.id === id))
                };
                resolve(obj);
            }, (e) => {
                reject(e);
            });
        };
        return new Promise(getAsync);
    }
    append(marks) {
        const createId = (v) => {
            let hash = crypto_1.createHash("sha256");
            hash.update(v);
            return hash.digest("hex");
        };
        const getDomain = (v) => {
            let domain = v.match(/\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/i);
            if (domain) {
                return domain[0];
            }
            return "";
        };
        const appendAsync = (resolve, reject) => {
            this.marksDbSource$.subscribe((x) => {
                let objMap = new Map();
                x.data.forEach((v) => objMap.set(v.id, v));
                if (!Array.isArray(marks)) {
                    marks = [marks];
                }
                marks.forEach((v) => {
                    v.id = createId(v.url);
                    v.domain = getDomain(v.url);
                    if (objMap.has(v.id)) {
                        let curObj = objMap.get(v.id);
                        v.created = curObj.created;
                        v.updated = (new Date()).toISOString();
                    }
                    else {
                        v.created = (new Date()).toISOString();
                    }
                    objMap.set(v.id, v);
                });
                let obj = {
                    version: x.version,
                    updated: (new Date()).toISOString(),
                    data: Array.from(objMap.values())
                };
                this.marksFileDb.saveMarksDb(obj)
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
            this.marksDbSource$.subscribe((x) => {
                let objMap = new Map();
                x.data.forEach((v) => objMap.set(v.id, v));
                if (!Array.isArray(marks)) {
                    marks = [marks];
                }
                marks.forEach((v) => objMap.delete(v));
                let obj = {
                    version: x.version,
                    updated: (new Date()).toISOString(),
                    data: Array.from(objMap.values())
                };
                this.marksFileDb.saveMarksDb(obj)
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