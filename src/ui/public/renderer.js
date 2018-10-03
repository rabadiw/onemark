"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require("electron");
const OnemarkActions = require("./OnemarkActions");
// open link event
window.document.addEventListener(OnemarkActions.AppEventTypes.openLink, function (args) {
    let { url, title } = args.detail;
    if (url) {
        electron.shell.openExternal(url, title);
    }
});
// copy link event
window.document.addEventListener(OnemarkActions.AppEventTypes.copyLink, function (args) {
    let { url } = args.detail;
    electron.clipboard.writeText(url);
});
// check for update event
window.document.addEventListener(OnemarkActions.AppEventTypes.checkForUpdate, function (args) {
    electron.ipcRenderer.send(OnemarkActions.AppEventTypes.checkForUpdate, null);
});
// update & restart event
window.document.addEventListener(OnemarkActions.AppEventTypes.updateAndRestart, function (args) {
    electron.ipcRenderer.send(OnemarkActions.AppEventTypes.updateAndRestart, null);
});
// 
// Main to Process communications
// 
const createNotice = (msg) => {
    let notice = document.createElement('div');
    notice.setAttribute('class', 'notice');
    notice.innerHTML = msg;
    return notice;
};
electron.ipcRenderer.on(OnemarkActions.AppEventTypes.windowNotification, (event, args) => {
    OnemarkActions.AppNotificationEvent.next({ message: JSON.stringify(args) });
});
// Display a notification message when a new version is ready for install
// Customize the code to match your HTML structure
electron.ipcRenderer.on(OnemarkActions.AppEventTypes.updateDownloaded, (event, args) => {
    OnemarkActions.AppUpdateEvent.next({ hasUpdate: true });
    // var notice = createNotice(
    //   `<p>
    //     <span>Update ready! Restart to update?</span>
    //     <a id="restart" class="apply" href="#"><i class="fa fa-check"></i></a>
    //     <a id="close" class="close" href="#"><i class="fa fa-close"></i></a>      
    //   </p>`
    // )
    // notice.querySelector('#restart').addEventListener('click', (e) => {
    //   e.preventDefault()
    //   event.sender.send(appEventTypes.updateAndRestart)
    // })
    // notice.querySelector('#close').addEventListener('click', (e) => {
    //   e.preventDefault()
    //   document.body.removeChild(notice)
    // })
    // document.body.appendChild(notice)
});
