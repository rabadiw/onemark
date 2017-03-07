const { ipcRenderer } = require('electron')
const { appEventTypes } = require("../../../app-events")

const createNotice = (msg) => {
    let notice = document.createElement('div')
    notice.setAttribute('class', 'notice')
    notice.innerHTML = msg
    return notice
}

// Display a notification message when a new version is ready for install
// Customize the code to match your HTML structure
ipcRenderer.on(appEventTypes.updateDownloaded, (event) => {
    var notice = createNotice(
        `<p>An updated application package will be installed on next restart, 
         <a id="restart" href="#">click here to update now</a>.</p>`
    )
    document.body.appendChild(notice)
    document.querySelector('#restart').addEventListener('click', (e) => {
        e.preventDefault()
        event.sender.send(appEventTypes.updateAndRestart)
    })
})


ipcRenderer.on(appEventTypes.windowNotification, (event, args) => {
    let notice = createNotice(
        `<p>${args}</p>`
    )
    document.body.appendChild(notice)
})