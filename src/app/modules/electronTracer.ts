// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const log = require('electron-log');
const util = require('util');
log.transports.console = function (msg) {
  var text = util.format.apply(util, msg.data);
  console.log(`[${msg.date.toISOString()}] [${msg.level}] ${text}`);
};

export { log as tracer };
