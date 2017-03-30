// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
const { app } = require("electron")

const squirrelStartup = (args) => {
  if (process.platform !== "win32") {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  let squirrelCommand = args.filter(v => /^--squirrel\W/.test(v))[0];
  switch (squirrelCommand) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      const fs = require('fs')
      fs.writeFile(path.join(appFolder, "test.txt"), `
      AppFolder: ${appFolder}
      RootAtomFolder: ${rootAtomFolder}
      updateDotExe: ${updateDotExe}
      exeName: ${exeName}
      `,
        function (err) {
          if (err) {
            return console.log(err);
          }
        })

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

exports.squirrelStartup = squirrelStartup