// Copyright (c) Wael Rabadi
// See LICENSE for details.

"use strict";

const startup = {
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

exports.startup = startup