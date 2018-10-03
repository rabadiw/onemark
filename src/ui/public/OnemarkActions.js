"use strict";
// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.
const Rx = require("rxjs");
exports.AppEventTypes = {
    checkForUpdate: "check-for-update",
    copyLink: "copy_link",
    openLink: "open_link",
    updateAndRestart: "update-and-restart",
    updateDownloaded: "update-downloaded",
    windowNotification: "window-notification",
};
exports.AppSearchEvent = new Rx.Subject();
exports.AppCopyEvent = new Rx.Subject();
exports.AppDeleteEvent = new Rx.Subject();
exports.AppEditEvent = new Rx.Subject();
exports.AppOpenEvent = new Rx.Subject();
exports.AppUpdateEvent = new Rx.Subject();
exports.AppUpdateRestartEvent = new Rx.Subject();
exports.AppNotificationEvent = new Rx.Subject();
function dispatchEvent(name, data) {
    // create and dispatch the event
    const event = new CustomEvent(name, { detail: data });
    window.document.dispatchEvent(event);
}
exports.dispatchEvent = dispatchEvent;
