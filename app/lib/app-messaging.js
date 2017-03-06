// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const { BrowserWindow, ipcMain } = require("electron");

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
    if (options === undefined || options.message === undefined) {
      return
    }

    if (options.window === undefined || typeof options.window !== BrowserWindow) {
      options.window = this.getMainWindow()
    }

    options.window.webContents.send(options.channel, options.args)
  }

  sendWindowMessage(win, channel, ...args) {
    this.run(() => {
      if (win === undefined || typeof win !== BrowserWindow) {
        console.log("Getting window object")
        win = this.getMainWindow();
      }
      win.webContents.send(channel, ...args)
    })
  }
}



module.exports = { AppMessaging }
