// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');

// open link event
window.document.addEventListener("open_link", function (args) {
  let { url, title } = args.detail;
  if (url) {
    electron.shell.openExternal(url, title);
  }
});

// copy link event
window.document.addEventListener("copy_link", function (args) {
  let { url } = args.detail;
  electron.clipboard.writeText(url)
});