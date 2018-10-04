// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const util = require('util');

interface ITracer extends Object {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
  debug: (msg: string) => void
  format: (msg: { date: Date, level: string, data: string }) => void
  stringify: (data: any) => string
  transport: (level: string, msg: string) => void
  logLevel: LogLevels
}

enum LogLevels { error, warn, info, debug }

const tracer: ITracer = {} as ITracer

tracer.info = (msg) => { tracer.transport(LogLevels[LogLevels.info], msg) }
tracer.warn = (msg) => { tracer.transport(LogLevels[LogLevels.warn], msg) }
tracer.error = (msg) => { tracer.transport(LogLevels[LogLevels.error], msg) }
tracer.debug = (msg) => { tracer.transport(LogLevels[LogLevels.debug], msg) }

tracer.stringify = (data) => {
  let formatArgs = undefined;
  if (Array.isArray(data)) {
    formatArgs = data
  } else {
    formatArgs = [data]
  }
  return util.format.apply(util, formatArgs);
}
tracer.format = (msg) => {
  var text = tracer.stringify(msg.data);
  return `[${msg.date.toISOString()}][${msg.level}] ${text}`;
}

tracer.transport = (level, msg) => {
  console.log(tracer.format({ date: new Date(), level: level, data: msg }))
}

const safeStringify = (k: string, v: any) => {
  let nv = "";
  try {
    nv = JSON.stringify(v)
  } catch (e) {
    nv = `${v.constructor.name}: ${e.message}`;
  }
  return JSON.stringify({ key: k, value: nv });
}

export { ITracer, LogLevels, tracer, safeStringify }
