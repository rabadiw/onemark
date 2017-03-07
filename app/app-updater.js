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

const status = (msg) => {
  sendNotification(msg);
  log.info(`app-updater::${msg}`);
}

autoUpdater.on("checking-for-update", (evt, info) => {
  status("Checking for update...");
})
autoUpdater.on("update-available", (evt, info) => {
  status("Update available.");
})
autoUpdater.on("update-not-available", (evt, info) => {
  status("Update not available.");
})
autoUpdater.on("error", (evt, err) => {
  status(`Error in auto-updater. ${err}`);
})
autoUpdater.on("download-progress", (evt, progressObj) => {
  status("Download progress...");
  log.info("progressObj", progressObj);
})
autoUpdater.on("update-downloaded", (evt, info) => {
  status("Update downloaded")
  sendUpdateDownloaded(autoUpdater)
  // sendWindowNotification("Update downloaded.  Will quit and install in 5 seconds.");
  // // Wait 5 seconds, then quit and install
  // setTimeout(function () {
  //   autoUpdater.quitAndInstall();
  // }, 5000)
})

const appUpdater = {
  checkForUpdate() {
    status("Checking for update")
    if (!appSettings.isProduction) { return; }
    // Wait a second for the window to exist before checking for updates.
    setTimeout(function () {
      autoUpdater.checkForUpdates()
    }, 1000);
  }
};

exports.appUpdater = appUpdater