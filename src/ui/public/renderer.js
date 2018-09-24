// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');
const { ipcRenderer, ipcMain } = require('electron');
const { AppEventTypes, AppUpdateRestartEvent } = require('../src/services/OnemarkActions');

// open link event
window.document.addEventListener(AppEventTypes.openLink, function (args) {
  let { url, title } = args.detail;
  if (url) {
    electron.shell.openExternal(url, title);
  }
});

// copy link event
window.document.addEventListener(AppEventTypes.copyLink, function (args) {
  let { url } = args.detail;
  electron.clipboard.writeText(url)
});

// check for update event
window.document.addEventListener(appEventTypes.checkForUpdate, function (args) {
  ipcRenderer.send(appEventTypes.checkForUpdate, null);
});

// update & restart event
window.document.addEventListener(AppEventTypes.updateAndRestart, function (args) {
  ipcRenderer.send(AppEventTypes.updateAndRestart, null);
});

// 
// Main to Process communications
// 
const createNotice = (msg) => {
  let notice = document.createElement('div')
  notice.setAttribute('class', 'notice')
  notice.innerHTML = msg
  return notice
}

// TODO: add notifications screen
ipcRenderer.on(appEventTypes.windowNotification, (event, args) => {
  // alert('window-notification!', JSON.stringify(arg))
})

// Display a notification message when a new version is ready for install
// Customize the code to match your HTML structure
ipcRenderer.on(appEventTypes.updateDownloaded, (event, args) => {
  AppUpdateEvent.next({ hasUpdate: true });
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
})
