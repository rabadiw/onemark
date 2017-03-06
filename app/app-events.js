const { AppMessaging } = require("./lib/app-messaging")
const { dialog } = require("electron")

const exceptionHandler = (e) => {
    dialog.showErrorBox('Caught unhandled exception', e || 'Unknown error message')
}

const appMessaging = new AppMessaging(exceptionHandler)

const appEventTypes = {
    checkForUpdate: "check-for-update",
    openAboutWindow: "open-about-window",
    openLearnMore: "open-learn-more",
    openElectronSite: "open-electron-website",
    updateDownloaded: "update-downloaded",
    updateAndRestart: "update-and-restart",
    windowNotification: "window-notification",
}

const sendCheckForUpdate = (...args) => { appMessaging.sendMessage(appEventTypes.checkForUpdate, ...args) }
const sendOpenAboutWindow = (...args) => { appMessaging.sendMessage(appEventTypes.openAboutWindow, ...args) }
const sendOpenLearnMore = (...args) => { appMessaging.sendMessage(appEventTypes.openLearnMore, ...args) }
const sendOpenElectronSite = (...args) => { appMessaging.sendMessage(appEventTypes.openElectronSite, ...args) }
const sendUpdateDownloaded = (...args) => { appMessaging.sendMessage(appEventTypes.updateDownloaded, ...args) }
const sendUpdateAndRestart = (...args) => { appMessaging.sendMessage(appEventTypes.updateAndRestart, ...args) }

const sendNotification = (...args) => { appMessaging.sendWindowMessage(null, appEventTypes.windowNotification, ...args) }
// const sendWindowNotification = (win, ...args) => { appMessaging.sendWindowMessage(win, appEventTypes.windowNotification, ...args) }

function sendWindowNotification(...args) {
    appMessaging.sendWindowMessage(null, appEventTypes.windowNotification, ...args)
}
function sendWindowNotification(win, ...args) {
    appMessaging.sendWindowMessage(win, appEventTypes.windowNotification, ...args)
}

module.exports = {
    appEventTypes,
    sendCheckForUpdate,
    sendOpenAboutWindow,
    sendOpenElectronSite,
    sendOpenLearnMore,
    sendUpdateDownloaded,
    sendUpdateAndRestart,
    sendNotification,
    sendWindowNotification,
}