// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
const {app, Menu} = require("electron");

const {appUpdater} = require("./appUpdater");
const {appController} = require("./appController");
const {startup} = require("./startup");

// app init logic, i.e. uncaughtException
appController.init();

function onReady() {
    // Check entry args
    if (startup.handleStartupEvent()) { return; }
    // App Menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./appMenu')));
    // Main Window
    appController.ensureMainWindow();
    // Check for update
    appUpdater.checkForUpdate();
}

function onClosed() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
}

function onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    appController.ensureMainWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);
// Quit when all windows are closed.
app.on("window-all-closed", onClosed);
app.on("activate", onActivate);
