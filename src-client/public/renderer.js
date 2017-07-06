// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');

const electronPort = (function () {
  return {
    openUrl: function (props) {
      if (props && props.url) {
        electron.shell.openExternal(props.url, props.title);
      }
    }
  }
});

global.electronPort  = new electronPort();