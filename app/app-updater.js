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
const { sendNotification, sendUpdateDownloaded } = require("./app-events");
const { appSettings } = require("./config/settings")

autoUpdater.on("checking-for-update", (evt, info) => {
  sendNotification("Checking for update...");
})
autoUpdater.on("update-available", (evt, info) => {
  sendNotification("Update available.");
})
autoUpdater.on("update-not-available", (evt, info) => {
  sendNotification("Update not available.");
})
autoUpdater.on("error", (evt, err) => {
  sendNotification("Error in auto-updater.");
})
autoUpdater.on("download-progress", (evt, progressObj) => {
  sendNotification("Download progress...");
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