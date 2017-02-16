const path = require("path");

const resolveRoot = (...relativePath) => {
    return path.resolve(__dirname, "..", ...relativePath);
}

const app = {
    isProduction: true,
    iconPath: `${resolveRoot("www", "assets", "favicon.ico")}`,
    rootIndex: `file://${resolveRoot("www", "index.html")}` 
}

exports.app = app