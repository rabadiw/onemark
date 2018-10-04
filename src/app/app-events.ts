const { AppMessaging } = require("./modules/app-messaging");
const { dialog } = require('electron');
const { tracer } = require("./modules/tracer");

const exceptionHandler = (e) => {
    let msg = 'Unknown error';
    try {
        msg = tracer.stringify(e);
    } catch{ }
    tracer.error(`Unhandled exception::${msg}`);
    if (dialog) {
        dialog.showErrorBox('Unhandled exception', msg);
    }
}

const appMessaging = (new AppMessaging()).useExceptionHandler(exceptionHandler);

const appEventNames = {
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

const sendOpenLearnMore = (...args) => { _msg(appEventNames.openLearnMore, false, ...args) }
const sendCheckForUpdate = (...args) => { _msg(appEventNames.checkForUpdate, false, ...args) }
const sendOpenAboutWindow = (...args) => { _msg(appEventNames.openAboutWindow, false, ...args) }
const sendOpenElectronSite = (...args) => { _msg(appEventNames.openElectronSite, false, ...args) }
const sendUpdateAndRestart = (...args) => { _msg(appEventNames.updateAndRestart, false, ...args) }
const sendUpdateDownloaded = (...args) => { _msg(appEventNames.updateDownloaded, true, ...args) }

const sendNotification = (...args) => {
    appMessaging.sendBrowserMessage({
        window: null,
        args: args,
        channel: appEventNames.windowNotification,
    })
}
const sendWindowNotification = (win, ...args) => {
    appMessaging.sendBrowserMessage({
        window: win,
        args: args,
        channel: appEventNames.windowNotification,
    })
}

export {
    appEventNames,
    sendCheckForUpdate,
    sendOpenAboutWindow,
    sendOpenElectronSite,
    sendOpenLearnMore,
    sendUpdateDownloaded,
    sendUpdateAndRestart,
    sendNotification,
    sendWindowNotification,
}