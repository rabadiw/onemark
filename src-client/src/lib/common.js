// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// export function sleep(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

export function traceError(error) {
  if (error.response) {
    console.log(error.response);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export function log(v) {
  console.log(v);
}

export function openLink(props) {
  if (isElectron()) {
    // create and dispatch the event
    var event = new CustomEvent("open_link", {
      detail: {
        url: props.url,
        title: props.title
      }
    })
    window.document.dispatchEvent(event)
  } else {
    window.open(props.url, props.url)
  }
}

export function copyLink(props) {
  // create and dispatch the event
  var event = new CustomEvent("copy_link", {
    detail: {
      url: props.url,
      title: props.title
    }
  })
  window.document.dispatchEvent(event)
}

export function isElectron() {
  try {
    return (window.process.versions.electron !== undefined)
  } catch (e) {
    return false
  }
}

export function isBrowser() {
  return window.process.env.BROWSER;
}
