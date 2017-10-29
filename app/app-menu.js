// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";
//const { ipcMain } = require("electron")
const { appSettings } = require("./config/settings.js")
const { sendOpenLearnMore, sendOpenElectronSite, sendOpenAboutWindow, sendCheckForUpdate } = require("./app-events")

const template = [
    {
        label: "View",
        submenu: [
            {
                label: "Main",
                accelerator: "CmdOrCtrl+N",
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.loadURL(appSettings.rootIndexUrl);
                    }
                }
            },
            {
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
            {
                role: "togglefullscreen"
            },
            {
                label: "Toggle Developer Tools",
                accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools();
                    }
                }
            },
        ]
    },
    {
        role: "window",
        submenu: [
            { role: "minimize" },
            { role: "close" },
        ]
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click: () => { sendOpenLearnMore() }
            },
            {
                label: "Electron",
                click: () => { sendOpenElectronSite() }
            },
            {
                type: "separator"
            },
            {
                label: "Check for update",
                click: () => { sendCheckForUpdate() }

            },
            {
                type: "separator"
            },
            {
                label: "About",
                click: () => { sendOpenAboutWindow() }
            }
        ]
    },
];
if (process.platform === "darwin") {
    const name = require("electron").app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                role: "about"
            },
            {
                type: "separator"
            },
            {
                role: "services",
                submenu: []
            },
            {
                type: "separator"
            },
            {
                role: "hide"
            },
            {
                role: "hideothers"
            },
            {
                role: "unhide"
            },
            {
                type: "separator"
            },
            {
                role: "quit"
            },
        ]
    });
    // Window menu.
    template[3].submenu = [
        {
            label: "Close",
            accelerator: "CmdOrCtrl+W",
            role: "close"
        },
        {
            label: "Minimize",
            accelerator: "CmdOrCtrl+M",
            role: "minimize"
        },
        {
            label: "Zoom",
            role: "zoom"
        },
        {
            type: "separator"
        },
        {
            label: "Bring All to Front",
            role: "front"
        }
    ];
}

module.exports = template
