const { sendMessage, sendWindowMessage } = require("./lib/app-messaging")

const appEventTypes = {
    checkForUpdate: "check-for-update",
    openAboutWindow: "open-about-window",
    openLearnMore: "open-learn-more",
    openElectronSite: "open-electron-website",
    updateDownloaded: "update-downloaded",
    updateAndRestart: "update-and-restart",
    windowNotification: "window-notification",
}

const sendCheckForUpdate = (...args) => { sendMessage(appEventTypes.checkForUpdate, ...args) }
const sendOpenAboutWindow = (...args) => { sendMessage(appEventTypes.openAboutWindow, ...args) }
const sendOpenLearnMore = (...args) => { sendMessage(appEventTypes.openLearnMore, ...args) }
const sendOpenElectronSite = (...args) => { sendMessage(appEventTypes.openElectronSite, ...args) }
const sendUpdateDownloaded = (...args) => { sendMessage(appEventTypes.updateDownloaded, ...args) }
const sendUpdateAndRestart = (...args) => { sendMessage(appEventTypes.updateAndRestart, ...args) }

const sendWindowNotification = (win, ...args) => { sendWindowMessage(win, appEventTypes.windowNotification, ...args) }

module.exports = {
    appEventTypes,
    sendCheckForUpdate,
    sendOpenAboutWindow,
    sendOpenElectronSite,
    sendOpenLearnMore,
    sendUpdateDownloaded,
    sendUpdateAndRestart,
    sendWindowNotification,
}