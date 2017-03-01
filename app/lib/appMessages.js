const { BrowserWindow  } = require("electron");

exports.appMessages = {
  sendStatus(title, message) {
    let windows = BrowserWindow.getAllWindows()
    if (windows.length == 0) {
      return
    }

    windows[0].webContents.send("message", title, message)
  }
}