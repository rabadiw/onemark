// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as Rx from 'rxjs';

export const AppEventTypes = {
  checkForUpdate: "check-for-update",
  copyLink: "copy_link",
  openLink: "open_link",
  updateAndRestart: "update-and-restart",
  updateDownloaded: "update-downloaded",
  windowNotification: "window-notification",
}

export const AppSearchEvent = new Rx.Subject();
export const AppCopyEvent = new Rx.Subject();
export const AppDeleteEvent = new Rx.Subject();
export const AppEditEvent = new Rx.Subject();
export const AppOpenEvent = new Rx.Subject();
export const AppUpdateEvent = new Rx.Subject();
export const AppUpdateRestartEvent = new Rx.Subject();
export const AppNotificationEvent = new Rx.Subject<{ message: string, action: any }>();

export function dispatchEvent(name: string, data: object) {
  // create and dispatch the event
  const event = new CustomEvent(name, { detail: data });
  window.document.dispatchEvent(event);
}