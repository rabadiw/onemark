"use strict";
const {app, shell, dialog, Menu, nativeImage} = require("electron");
const config = require("./config/settings.js");
const template = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Main',
                accelerator: 'CmdOrCtrl+N',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.loadURL(config.app.rootIndex);
                    }
                }
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
            {
                role: 'togglefullscreen'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools();
                    }
                }
            },
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: () => { shell.openExternal('https://github.com/rabadiw/onemark#readme'); }
            },
            {
                label: 'Electron',
                click: () => { shell.openExternal('http://electron.atom.io'); }
            },
            {
                type: 'separator'
            },
            {
                label: 'About',
                click: () => {
                    dialog.showMessageBox({
                        type: "info",
                        title: app.getName(),
                        message:
                        `${app.getName()} 

Version: ${app.getVersion()}
Chrome: ${process.versions.chrome}
Node: ${process.versions.node}
Shell: ${process.versions.electron}`
                    })
                }
            }
        ]
    },
];
if (process.platform === 'darwin') {
    const name = require('electron').remote.app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            },
        ]
    });
    // Window menu.
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ];
}
const appMenu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(appMenu);
