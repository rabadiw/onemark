// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";

const squirrelStartup = {
  handleStartupEvent() {
    if (process.platform !== "win32") {
      return false;
    }
    let squirrelCommand = process.argv.filter(v => /^--squirrel\w/.test(v))[0];
    switch (squirrelCommand) {
      case "--squirrel-install":
      case "--squirrel-updated":
        // Optionally do things such as:
        //
        // - Install desktop and start menu shortcuts
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        //   explorer context menus
        // Always quit when done
        app.quit();
        return true;
      case "--squirrel-uninstall":
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers
        // Always quit when done
        app.quit();
        return true;
      case "--squirrel-obsolete":
        // This is called on the outgoing version of your app before
        // we update to the new version - it"s the opposite of
        // --squirrel-updated
        app.quit();
        return true;
    }
  }
}

const startup = () => {
  let handlers = [];
  const getNextFunc = (arg, arr) => {
    let next = () => { };
    if (!arr) { return next; }
    if (arr.length > 1) {
      let nextArr = arr.slice(1);
      next = getNextFunc(arg, nextArr);
    }
    return () => { arr[0](arg, next); }
  };
  return {
    use(...handler) {
      handlers.push(...handler);
      return this;
    },
    start(args) {
      if (handlers.length === 0) {
        console.log("No handlers found");
      } else {
        handlers[0](args, getNextFunc(args, handlers.slice(1)));
      }
    }
  }
};

exports.startup = startup