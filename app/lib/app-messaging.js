// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const { BrowserWindow, ipcMain } = require("electron");

function sendMessage(channel, ...args) {
  ipcMain.emit(channel, ...args)
}

function sendWindowMessage(channel, ...args) {
  let windows = BrowserWindow.getAllWindows()
  if (windows.length == 0) {
    return
  }

  windows[0].webContents.send("message", ...args)
}

function sendWindowMessage(win, channel, ...args) {
  if (win != undefined) {
    win.webContents.send(channel, ...args)
  } else {
    sendWindowMessage(channel, ...args)
  }
}

module.exports = { sendMessage, sendWindowMessage }
