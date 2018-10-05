// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict"
import { appSettings } from "./config/settings"
import { tracer } from "./modules/tracer";
import { app, Menu, BrowserWindow, dialog, ipcMain, shell, session } from "electron";
import { appUpdater } from "./app-updater";
import { appEventNames } from "./app-events";
const windowState = require('electron-window-state')

const logInfo = (msg) => {
    let logMsg = tracer.stringify(msg);
    tracer.info(`app::${logMsg}`);
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
        show: options.show,
        icon: appSettings.iconPath,
        minWidth: 420,
        // turn on experimental features (e.g. css-grid in chrome version 56)
        //webPreferences: { experimentalFeatures: true }
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

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    mainWindowState: any = undefined;
    mainWindow: any = undefined;
    startOptions: any;

    constructor(options: any) {
        this.startOptions = options;
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on("ready", () => this.readyHandler())
        // Quit when all windows are closed.
        app.on("window-all-closed", () => this.closedHandler())
        app.on("activate", () => this.activateHandler())
    }

    static uncaughtExceptionHandler(e) {
        console.error(`Caught unhandled exception: ${JSON.stringify(e)}`)
        dialog.showErrorBox('Caught unhandled exception', e.message || 'Unknown error message')
        app.quit()
    }

    ensureMainWindow() {

        const isDarwin = () => { return ((/^darwin/.test(process.platform))) };

        if (this.startOptions.hidden && !isDarwin()) { return; }

        if (this.mainWindowState === undefined || this.mainWindowState === null) {
            this.mainWindowState =
                windowState({
                    defaultWidth: 800,
                    defaultHeight: 600
                })
        }

        if (this.mainWindow === undefined || this.mainWindow === null) {
            this.mainWindow =
                createMainWindow({
                    stateManager: this.mainWindowState,
                    indexUrl: appSettings.rootIndexUrl,
                    showDevTools: !appSettings.isProduction,
                    show: !this.startOptions.hidden
                })

            this.setupMessages(this.mainWindow)
        }

        // try {
        //     if (this.startOptions.hidden && this.mainWindow) {
        //         this.startOptions.hidden = false;
        //         this.mainWindow.minimized();
        //     }
        // } catch (e) {
        //     logInfo(e);
        // }
    }

    setupMessages(win) {

        if (win === undefined) { ReferenceError("setupMessages expected a win object") }

        win.once('ready-to-show', () => {
            win.show()
            // Check for update
            appUpdater.checkForUpdate()
        })

        // intercept client API calls and redirect to API url
        session.defaultSession.webRequest.onBeforeRequest({ urls: ['*://*./*'] }, (details, callback) => {
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

        ipcMain.on(appEventNames.checkForUpdate, (event, ...args) => {
            appUpdater.checkForUpdate()
        })

        ipcMain.on(appEventNames.updateAndRestart, (event, ...args) => {
            appUpdater.quitAndInstall();
        })

        ipcMain.on(appEventNames.windowNotification, (event, ...args) => {
            logInfo(args)
            dialog.showErrorBox("Notification", "Test message" + args)
        })

        ipcMain.on(appEventNames.openAboutWindow, (event, ...args) => {
            logInfo(args)
            const appSettings = require("./api/config/settings").AppConfig.loadSettings();
            let content = `${app.getName()} 

Version: ${app.getVersion()}
Chrome: ${process.versions["chrome"]}
Node: ${process.versions.node}
Shell: ${process.versions["electron"]}
Process ID: ${process.pid}
API URL: http://localhost:${appSettings.port}
Data path: ${appSettings.marksDbPath}
`
            dialog.showMessageBox({
                type: "info",
                title: app.getName(),
                message: content
            })
        })

        // eslint-disable-next-line no-unused-vars
        ipcMain.on(appEventNames.openLearnMore, (event, ...args) => {
            shell.openExternal(appSettings.appUrl);
        })

        // eslint-disable-next-line no-unused-vars
        ipcMain.on(appEventNames.openElectronSite, (event, ...args) => {
            shell.openExternal(appSettings.electronUrl);
        })

        // ipcMain.on(appEventNames.appNotification, (event, args) => {
        //   dialog.showErrorBox("Notification", `${event} ${args}`)
        // })
    }

    activateHandler() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        this.ensureMainWindow()
    }

    closedHandler() {
        this.mainWindow = undefined;
        this.mainWindowState = undefined;
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

export { OnemarkApp }