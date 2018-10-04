// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// const log = require("electron-log");
const { BrowserWindow, ipcMain } = require("electron");
// const { tracer } = require("./tracer");
import { tracer } from './tracer';

const logInfo = (msg) => {
  let logMsg = tracer.stringify(msg);
  tracer.info(`app-messaging::${logMsg}`);
}

class AppMessaging {
  run: (action: any) => void;
  exceptionHandler: (e: any) => void;
  useExceptionHandler(exceptionHandler) {
    this.exceptionHandler = exceptionHandler
    this.run = (action) => {
      try {
        action()
      } catch (e) {
        this.exceptionHandler(e)
      }
    }
    return this;
  }

  sendMessage(options: { channel: string, args: [], notifyClient: boolean }) {
    let { channel, args, notifyClient } = options
    this.run(() => { ipcMain.emit(channel, ...args) })

    // send message to client if notifyClient is true
    if (true === notifyClient) {
      this.run(() => {
        this.sendBrowserMessage({
          window: null,
          args: args,
          channel: channel
        })
      })
    }
  }

  getBrowserMainWindow() {
    let windows = BrowserWindow.getAllWindows()
    if (windows.length == 0) {
      return
    }
    return windows[0].webContents
  }

  sendBrowserMessage(options: any = {}) {
    logInfo(options)
    this.run(() => {
      let { window, channel, args } = options;
      if (channel === undefined) {
        return
      }

      if (window === undefined || window === null) {
        logInfo("Getting window object")
        window = this.getBrowserMainWindow()
      }

      window.webContents.send(channel, ...args)
      logInfo(`Sending "${args}" on channel "${channel}" to window "${window.getTitle()}"`)
    })
  }
}

export { AppMessaging }