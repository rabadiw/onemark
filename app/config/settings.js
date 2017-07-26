// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const path = require("path");
const url = require('url')
// const fs = require('fs')

const resolveRoot = (...relativePath) => {
    return path.resolve(__dirname, "..", ...relativePath);
}

const isElectronDevMode = () => {
    return process.defaultApp ||
        /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
        /[\\/]electron[\\/]/.test(process.execPath)
}
const isDevMode = () => {
    return (process.argv || []).find(v => /--dev/.test(v)) !== undefined
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

if (isElectronDevMode()) {
    // settings.rootIndexUrl = "http://localhost:3000"
}

exports.appSettings = settings