"use strict";
const electron = require("electron");
const config = require('./config/settings')
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const handleStartupEvent = function () {
    if (process.platform !== "win32") {
        return false;
    }
    let squirrelCommand = process.argv.filter(v => /^--squirrel\w/.test(v))[0];
    switch (squirrelCommand) {
        case "--squirrel-install":
        case "--squirrel-updated":
            // Optionally do things such as:
            //
            // - Install desktop and start menu shortcuts
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus
            // Always quit when done
            app.quit();
            return true;
        case "--squirrel-uninstall":
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers
            // Always quit when done
            app.quit();
            return true;
        case "--squirrel-obsolete":
            // This is called on the outgoing version of your app before
            // we update to the new version - it"s the opposite of
            // --squirrel-updated
            app.quit();
            return true;
    }
};

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    // and load the index.html of the app.
    // if (process.env.NODE_ENV === "production") {
    mainWindow.loadURL(config.app.rootIndex);
    // } else {
    //  mainWindow.loadURL(`http://localhost:3000`)
    // }
    // Open the DevTools.
    if (!config.app.isProduction) {
        mainWindow.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function onReady() {
    // Check entry args
    if (handleStartupEvent()) {
        return;
    }
    // Start the UI
    createWindow();
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
    if (mainWindow === null) {
        createWindow();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);
// Quit when all windows are closed.
app.on("window-all-closed", onClosed);
app.on("activate", onActivate);
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const menu = require('./app-menu');
