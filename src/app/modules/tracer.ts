// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

interface ITracer extends Object {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
  debug: (msg: string) => void
}

enum Levels {
  error,
  warn,
  info,
  debug
}

// function pad(val: number, zeros?: number) {
//   zeros = zeros || 2;
//   return (new Array(zeros + 1).join('0') + val).substr(-zeros, zeros);
// }

function formatConsole(msg) {
  // var ts =
  //   pad(msg.date.getHours()) + ':' +
  //   pad(msg.date.getMinutes()) + ':' +
  //   pad(msg.date.getSeconds()) + ':' +
  //   pad(msg.date.getMilliseconds(), 4);
  return `[${msg.date.toISOString()}] [${msg.level}] ${msg.text}`
}

const log = (level: string, msg: string) => {
  console.log(formatConsole({ date: new Date(), level: level, text: msg }))
}

let tracer: ITracer = {} as ITracer

tracer.info = (msg) => { log(Levels[Levels.info], msg) }
tracer.warn = (msg) => { log(Levels[Levels.warn], msg) }
tracer.error = (msg) => { log(Levels[Levels.error], msg) }
tracer.debug = (msg) => { log(Levels[Levels.debug], msg) }

export { ITracer, tracer }
