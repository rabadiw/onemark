"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require("electron");

const AppEventNames = {
    checkForUpdate: "check-for-update",
    copyLink: "copy_link",
    openLink: "open_link",
    updateAndRestart: "update-and-restart",
    updateDownloaded: "update-downloaded",
    windowNotification: "window-notification",
}

// open link event
window.document.addEventListener(AppEventNames.openLink, function (evt) {
    let { url, title } = evt.detail;
    if (url) {
        electron.shell.openExternal(url, title);
    }
});
// copy link event
window.document.addEventListener(AppEventNames.copyLink, function (evt) {
    let { url } = evt.detail;
    electron.clipboard.writeText(url);
});
// check for update event
window.document.addEventListener(AppEventNames.checkForUpdate, function (evt) {
    electron.ipcRenderer.send(AppEventNames.checkForUpdate, null);
});
// update & restart event
window.document.addEventListener(AppEventNames.updateAndRestart, function (evt) {
    electron.ipcRenderer.send(AppEventNames.updateAndRestart, evt.detail);
});
// 
// Main to Process communications
// 
electron.ipcRenderer.on(AppEventNames.windowNotification, (event, args) => {
    dispatchEvent(AppEventNames.windowNotification, args);
});
// Display a notification message when a new version is ready for install
// Customize the code to match your HTML structure
electron.ipcRenderer.on(AppEventNames.updateDownloaded, (event, args) => {
    dispatchEvent(AppEventNames.updateDownloaded, { hasUpdate: true });
});


// functions
function dispatchEvent(name, data) {
    // create and dispatch the event
    const event = new CustomEvent(name, { detail: data });
    window.document.dispatchEvent(event);
}