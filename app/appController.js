// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
const {BrowserWindow, dialog} = require("electron");
const {appSettings} = require('./config/settings')
const windowState = require('electron-window-state');

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let mainWindowState;

const appController = {
  init() {

    // Manage unhandled exceptions as early as possible
    process.on('uncaughtException', (e) => {
      console.error(`Caught unhandled exception: ${e}`)
      dialog.showErrorBox('Caught unhandled exception', e.message || 'Unknown error message')
      app.quit()
    });

  },

  ensureMainWindow() {
    if (mainWindow === undefined) {
      mainWindow = this.createMainWindow();
    }
  },

  createMainWindow() {
    mainWindowState = windowState({
      defaultWidth: 800,
      defaultHeight: 600
    });

    // Create the browser window.
    let mainWindow = new BrowserWindow({
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      icon: appSettings.iconPath
    });
    mainWindow.loadURL(appSettings.rootIndexUrl);
    // Open the DevTools
    if (!appSettings.isProduction) {
      mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });

    // track window state
    mainWindowState.manage(mainWindow);

    return mainWindow;
  }
};

exports.appController = appController