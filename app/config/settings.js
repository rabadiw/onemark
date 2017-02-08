const path = require("path");

const app = {
    isProduction: true,
    rootIndex: `file://${path.resolve("app","www","index.html")}` //`file://${__dirname}/www/index.html`
}

exports.app = app