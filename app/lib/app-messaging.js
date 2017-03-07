// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const log = require("electron-log");
const { BrowserWindow, ipcMain } = require("electron");

const logInfo = (msg) => {
  log.info(`app-messaging::${msg}`)
}

class AppMessaging {
  constructor(exceptionHandler) {
    this.exceptionHandler = exceptionHandler
    this.run = (action) => {
      try {
        action()
      } catch (e) {
        this.exceptionHandler(e)
      }
    }
  }

  sendMessage(channel, ...args) {
    this.run(() => { ipcMain.emit(channel, ...args) })
  }

  getMainWindow() {
    let windows = BrowserWindow.getAllWindows()
    if (windows.length == 0) {
      return
    }
    return windows[0].webContents
  }

  sendWindowMessage(options = {}) {
    logInfo(options)
    this.run(() => {
      let { window, channel, args } = options;
      if (channel === undefined) {
        return
      }

      if (window === undefined || typeof window !== BrowserWindow) {
        logInfo("Getting window object")
        window = this.getMainWindow()
      }

      window.webContents.send(channel, ...args)
      logInfo(`Sending "${args}" on channel "${channel}" to window "${window.getTitle()}"`)
    })
  }
}

module.exports = { AppMessaging }
