const express = require("express");
const bodyParser = require("body-parser");
class OnemarkApi {
    constructor() {
        let app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ limit: 300 }));
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use("/", (req, res) => { res.send("Hello world!"); });
        app.listen(3010, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`App running at http://localhost:3010`);
            }
        });
    }
    run(options) {
    }
}
exports.OnemarkApi = OnemarkApi;
//# sourceMappingURL=onemark-api.js.map