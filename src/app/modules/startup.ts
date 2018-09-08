// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

"use strict";

const startup = () => {
  let handlers = [];
  const getNextFunc = (arg, arr) => {
    let next = () => { };
    if (!arr) { return next; }
    if (arr.length > 1) {
      let nextArr = arr.slice(1);
      next = getNextFunc(arg, nextArr);
    }
    return () => { arr[0](arg, next); }
  };
  return {
    use(...handler) {
      handlers.push(...handler);
      return this;
    },
    start(args) {
      if (handlers.length === 0) {
        console.log("No handlers found");
      } else {
        handlers[0](args, getNextFunc(args, handlers.slice(1)));
      }
    }
  }
};

export { startup }