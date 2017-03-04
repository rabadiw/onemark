const { ipcRenderer } = require('electron')
const { appEventTypes } = require("../../../app-events")

// Display a notification message when a new version is ready for install
// Customize the code to match your HTML structure
ipcRenderer.on(appEventTypes.updateDownloaded, (event) => {
    var notice = document.createElement('div')
    notice.setAttribute('class', 'notice')
    notice.innerHTML =
        `<p>An updated application package will be installed on next restart, 
         <a id="restart" href="#">click here to update now</a>.</p>`

    document.body.appendChild(notice)
    document.querySelector('#restart').addEventListener('click', (e) => {
        e.preventDefault()
        event.sender.send(appEventTypes.updateAndRestart)
    })
})