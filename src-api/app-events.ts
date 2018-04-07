const { AppMessaging } = require("./modules/app-messaging")
const { Dialog } = require("electron")

const exceptionHandler = (e) => {
    Dialog.showErrorBox('Caught unhandled exception', e || 'Unknown error message')
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

const _msg = (channel, notifiyClient, ...args) => {
    appMessaging.sendMessage({
        channel: channel,
        args: args,
        notifyClient: notifiyClient
    })
}

const sendOpenLearnMore = (...args) => { _msg(appEventTypes.openLearnMore, false, ...args) }
const sendCheckForUpdate = (...args) => { _msg(appEventTypes.checkForUpdate, false, ...args) }
const sendOpenAboutWindow = (...args) => { _msg(appEventTypes.openAboutWindow, false, ...args) }
const sendOpenElectronSite = (...args) => { _msg(appEventTypes.openElectronSite, false, ...args) }
const sendUpdateAndRestart = (...args) => { _msg(appEventTypes.updateAndRestart, false, ...args) }
const sendUpdateDownloaded = (...args) => { _msg(appEventTypes.updateDownloaded, true, ...args) }

const sendNotification = (...args) => {
    appMessaging.sendWindowMessage({
        window: null,
        args: args,
        channel: appEventTypes.windowNotification,
    })
}
const sendWindowNotification = (win, ...args) => {
    appMessaging.sendWindowMessage({
        window: win,
        args: args,
        channel: appEventTypes.windowNotification,
    })
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