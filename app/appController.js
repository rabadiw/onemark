// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
const {app, Menu, BrowserWindow, dialog} = require("electron");
const {appUpdater} = require("./appUpdater");
const {appSettings} = require('./config/settings')
const windowState = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

const uncaughtExceptionHandler = () => {
  // Manage unhandled exceptions as early as possible
  process.on('uncaughtException', (e) => {
    console.error(`Caught unhandled exception: ${e}`)
    dialog.showErrorBox('Caught unhandled exception', e.message || 'Unknown error message')
    app.quit()
  })
};

// options = {stateManager, indexUrl}
const createMainWindow = (options) => {
  // Create the browser window.
  let win = new BrowserWindow({
    x: options.stateManager.x,
    y: options.stateManager.y,
    width: options.stateManager.width,
    height: options.stateManager.height,
    icon: appSettings.iconPath
  });

  win.loadURL(options.indexUrl);

  // Open the DevTools
  if (options.showDevTools) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // track window state
  options.stateManager.manage(win);

  return win;
}

class OnemarkApp {

  constructor() {

    this.mainWindow = undefined;
    this.mainWindowState = undefined;

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", () => this.readyHandler());
    // Quit when all windows are closed.
    app.on("window-all-closed", () => this.onClosed());
    app.on("activate", () => this.onActivate());
  }

  ensureMainWindow() {
    if (this.mainWindowState === undefined) {
      this.mainWindowState =
        windowState({
          defaultWidth: 800,
          defaultHeight: 600
        });
    }

    if (this.mainWindow === undefined) {
      this.mainWindow =
        createMainWindow({
          stateManager: this.mainWindowState,
          indexUrl: appSettings.rootIndexUrl,
          showDevTools: !appSettings.isProduction
        });
    }
  }

  readyHandler() {
    // App Menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./appMenu')));
    // Main Window
    this.ensureMainWindow();
    // Check for update
    appUpdater.checkForUpdate();
  }

  onClosed() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    this.ensureMainWindow();
  }
}

exports.uncaughtExceptionHandler = uncaughtExceptionHandler;
exports.OnemarkApp = OnemarkApp;