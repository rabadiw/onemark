// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const log = require("electron-log");
const { BrowserWindow, ipcMain } = require("electron");

const logInfo = (msg) => {
  let logMsg = msg
  if (typeof (msg) === "object") {
    logMsg = JSON.stringify(msg)
  }
  log.info(`app-messaging::${logMsg}`)
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

  // {
  //   channel: string,
  //   args: [],
  //   notifyClient: boolean
  // }
  sendMessage(options = {}) {
    let { channel, args, notifyClient } = options
    this.run(() => { ipcMain.emit(channel, ...args) })

    // send message to client if notifyClient is true
    if (true === notifyClient) {
      this.run(() => {
        this.sendWindowMessage({
          window: null,
          args: args,
          channel: channel
        })
      })
    }
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
      logInfo(`Sending "${JSON.stringify(args)}" on channel "${channel}" to window "${window.getTitle()}"`)
    })
  }
}

module.exports = { AppMessaging }