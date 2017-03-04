// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//-------------------------------------------------------------------

const log = require("electron-log");
const { autoUpdater } = require("electron");
const { sendWindowNotification, sendUpdateDownloaded } = require("./app-events");
const { appSettings } = require("./config/settings")

autoUpdater.on("checking-for-update", (evt, info) => {
  sendWindowNotification("Checking for update...");
})
autoUpdater.on("update-available", (evt, info) => {
  sendWindowNotification("Update available.");
})
autoUpdater.on("update-not-available", (evt, info) => {
  sendWindowNotification("Update not available.");
})
autoUpdater.on("error", (evt, err) => {
  sendWindowNotification("Error in auto-updater.");
})
autoUpdater.on("download-progress", (evt, progressObj) => {
  sendWindowNotification("Download progress...");
  log.info("progressObj", progressObj);
})
autoUpdater.on("update-downloaded", (evt, info) => {
  sendUpdateDownloaded(autoUpdater)
  // sendWindowNotification("Update downloaded.  Will quit and install in 5 seconds.");
  // // Wait 5 seconds, then quit and install
  // setTimeout(function () {
  //   autoUpdater.quitAndInstall();
  // }, 5000)
})

const appUpdater = {
  checkForUpdate() {
    console.log("Checking for udpate")
    if (!appSettings.isProduction) { return; }
    // Wait a second for the window to exist before checking for updates.
    setTimeout(function () {
      autoUpdater.checkForUpdates()
    }, 1000);
  }
};

exports.appUpdater = appUpdater