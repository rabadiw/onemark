// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";
//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//-------------------------------------------------------------------

const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const {appMessages} = require("./lib/appMessages");
const {appSettings} = require('./config/settings')

autoUpdater.on('checking-for-update', () => {
  appMessages.sendStatus('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  appMessages.sendStatus('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  appMessages.sendStatus('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  appMessages.sendStatus('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  appMessages.sendStatus('Download progress...');
  log.info('progressObj', progressObj);
})
autoUpdater.on('update-downloaded', (ev, info) => {
  appMessages.sendStatus('Update downloaded.  Will quit and install in 5 seconds.');
  // Wait 5 seconds, then quit and install
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 5000)
})

const appUpdater = {
  checkForUpdate() {
    if (!appSettings.isProduction) { return; }
    // Wait a second for the window to exist before checking for updates.
    setTimeout(function () {
      autoUpdater.checkForUpdates()
    }, 1000);
  }
};

exports.appUpdater = appUpdater