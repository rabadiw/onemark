// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict"
const { app, Menu, BrowserWindow, dialog, ipcMain, shell, session } = require("electron")
const { appUpdater } = require("./app-updater")
const { appEventTypes } = require("./app-events")
const { appSettings } = require('./config/settings')
const windowState = require('electron-window-state')
const log = require("electron-log");

const logInfo = (msg) => {
    let logMsg = msg
    if (typeof (msg) === "object") {
        logMsg = JSON.stringify(msg)
    }
    log.info(`app::${logMsg}`)
}

const createMenu = () => {
    return Menu.buildFromTemplate(require('./app-menu'))
}

// options = {stateManager, indexUrl}
const createMainWindow = (options) => {
    // Create the browser window.
    let win = new BrowserWindow({
        x: options.stateManager.x,
        y: options.stateManager.y,
        width: options.stateManager.width,
        height: options.stateManager.height,
        icon: appSettings.iconPath,
        // turn on css-grid
        webPreferences: { experimentalFeatures: true }
    })

    win.loadURL(options.indexUrl)

    // Open the DevTools
    if (options.showDevTools) {
        win.webContents.openDevTools()
    }

    // Emitted when the window is closed.
    win.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    // track window state
    options.stateManager.manage(win)

    return win
}

class OnemarkApp {

    constructor() {

        // Keep a global reference of the window object, if you don't, the window will
        // be closed automatically when the JavaScript object is garbage collected.

        this.mainWindow = undefined
        this.mainWindowState = undefined

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on("ready", () => this.readyHandler())
        // Quit when all windows are closed.
        app.on("window-all-closed", () => this.closedHandler())
        app.on("activate", () => this.activateHandler())
    }

    static uncaughtExceptionHandler(e) {
        console.error(`Caught unhandled exception: ${e}`)
        dialog.showErrorBox('Caught unhandled exception', e.message || 'Unknown error message')
        app.quit()
    }

    ensureMainWindow() {
        if (this.mainWindowState === undefined) {
            this.mainWindowState =
                windowState({
                    defaultWidth: 800,
                    defaultHeight: 600
                })
        }

        if (this.mainWindow === undefined) {
            this.mainWindow =
                createMainWindow({
                    stateManager: this.mainWindowState,
                    indexUrl: appSettings.rootIndexUrl,
                    showDevTools: !appSettings.isProduction
                })

            this.setupMessages(this.mainWindow)
        }
    }

    setupMessages(win) {

        if (win === undefined) { ReferenceError("setupMessages expected a win object") }

        win.once('ready-to-show', () => {
            win.show()
            // Check for update
            appUpdater.checkForUpdate()
        })

        // intercept client API calls and redirect to API url
        session.defaultSession.webRequest.onBeforeRequest(['*://*./*'], (details, callback) => {
            if (details.url.indexOf(":3001/api/env", 1) > 0 &&
                '3001' !== process.env.ONEMARK_API_PORT) {
                let newUrl = `${process.env.ONEMARK_API_URL}api/env`;
                logInfo(`Redirecting ${details.url} to ${newUrl}`)
                callback({
                    redirectURL: `${newUrl}`
                })
            } else {
                callback({})
            }
        })

        ipcMain.on(appEventTypes.checkForUpdate, (event, ...args) => {
            appUpdater.checkForUpdate()
        })

        ipcMain.on(appEventTypes.updateDownloaded, (event, ...args) => {
            let { autoUpdater } = args
            if (autoUpdater) {
                ipcMain.on(appEventTypes.updateAndRestart, () => {
                    autoUpdater.quitAndInstall()
                })
            }
        })

        ipcMain.on(appEventTypes.windowNotification, (event, ...args) => {
            logInfo(args)
            dialog.showErrorBox("Notification", "Test message" + args)
        })

        ipcMain.on(appEventTypes.openAboutWindow, (event, ...args) => {
            logInfo(args)
            let content = `${app.getName()} 

Version: ${app.getVersion()}
Chrome: ${process.versions.chrome}
Node: ${process.versions.node}
Shell: ${process.versions.electron}
Process ID: ${process.pid}
API URL: http://localhost:${require("./api/config/settings").appSettings.port}
`
            dialog.showMessageBox({
                type: "info",
                title: app.getName(),
                message: content
            })
        })

        // eslint-disable-next-line no-unused-vars
        ipcMain.on(appEventTypes.openLearnMore, (event, ...args) => {
            shell.openExternal(appSettings.appUrl);
        })

        // eslint-disable-next-line no-unused-vars
        ipcMain.on(appEventTypes.openElectronSite, (event, ...args) => {
            shell.openExternal(appSettings.electronUrl);
        })

        // ipcMain.on(appEventTypes.appNotification, (event, args) => {
        //   dialog.showErrorBox("Notification", `${event} ${args}`)
        // })
    }

    activateHandler() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        this.ensureMainWindow()
    }

    closedHandler() {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            app.quit()
        }
    }

    readyHandler() {
        // App Menu
        Menu.setApplicationMenu(createMenu())
        // Main Window
        this.ensureMainWindow()
        // // Check for update
        // appUpdater.checkForUpdate()
    }
}

module.exports = { OnemarkApp }