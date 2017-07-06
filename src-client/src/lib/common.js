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

export function openUrl(props) {
  try {
    global.electronPort.openUrl({ url: props.url, title: props.url });
  } catch (e) {
    window.open(props.url, props.url);
  }
}

export function isBrowser() {
  return window.process.env.BROWSER;
}
