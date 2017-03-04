// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const path = require("path");
const url = require('url')

const resolveRoot = (...relativePath) => {
    return path.resolve(__dirname, "..", ...relativePath);
}

const isElectronDevMode = () => {
    // Thanks to 
    return process.defaultApp ||
        /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
        /[\\/]electron[\\/]/.test(process.execPath)
}
const isDevMode = () => {
    return /--dev/.test(process.argv || [])
}


const settings = {
    isProduction: !(isDevMode() || isElectronDevMode()),
    iconPath: `${resolveRoot("www", "assets", "favicon.ico")}`,
    rootIndexUrl: url.format({
        pathname: resolveRoot("www", "index.html"),
        protocol: 'file:',
        slashes: true
    }),
    appUrl: "https://github.com/rabadiw/onemark#readme",
    electronUrl: "http://electron.atom.io"
}

exports.appSettings = settings