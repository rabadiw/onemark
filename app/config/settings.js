const path = require("path");
const url = require('url')

const resolveRoot = (...relativePath) => {
    return path.resolve(__dirname, "..", ...relativePath);
}

const isDevMode = () => { return (process.argv || []).indexOf('--dev') !== -1; }

const settings = {
    isProduction: !isDevMode(),
    iconPath: `${resolveRoot("www", "assets", "favicon.ico")}`,
    rootIndexUrl: url.format({
        pathname: resolveRoot("www", "index.html"),
        protocol: 'file:',
        slashes: true
    })
}

exports.appSettings = settings