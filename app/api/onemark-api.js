"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class OnemarkApi {
    constructor({ tracer, port, bodyLimit }) {
        this.tracer = tracer || { info: (msg) => { console.log(msg); } };
        this.port = port || 3010;
        this.bodyLimit = bodyLimit || 300;
    }
    init() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: this.bodyLimit }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        return this;
    }
    register(options) {
        try {
            options.routes.forEach(v => {
                this.app.use(v.template, v.router);
            });
        }
        catch (e) {
            this.tracer.info(`Building router table failed. ${e}`);
        }
        return this;
    }
    run() {
        this.server = this.app.listen(this.port, (err) => {
            if (err) {
                this.tracer.info(err);
            }
        });
        this.tracer.info(`App running at http://${this.server.address().address}:${this.server.address().port}`);
    }
}
exports.OnemarkApi = OnemarkApi;
//# sourceMappingURL=onemark-api.js.map