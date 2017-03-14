"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class OnemarkApi {
    constructor(options) {
        let { trace, port } = options;
        this.trace = trace || ((msg) => { console.log(msg); });
        this.port = port || 3010;
    }
    init(options) {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: 300 }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        try {
            options.routes.forEach(v => {
                this.app.use(v.template, v.router);
            });
        }
        catch (e) {
            this.trace(`Building router table failed. ${e}`);
        }
        return this;
    }
    run() {
        this.server = this.app.listen(this.port, (err) => {
            if (err) {
                this.trace(err);
            }
        });
        this.trace(`App running at http://${this.server.address().address}:${this.server.address().port}`);
    }
}
exports.OnemarkApi = OnemarkApi;
//# sourceMappingURL=onemark-api.js.map