// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

const cmdline = {
  getArg(args: string[], argName: string) {
    const regex = new RegExp(`^${argName}[=]?`)
    const cmdDevPredicate = v => regex.test(v)
    return args.find(cmdDevPredicate)
  },
  getArgValue(args: string[], argName: string) {
    let v = this.getArg(args, argName)
    if (v !== undefined && (<string>v).indexOf('=') > 0) {
      return this.getArg(args, argName).split('=')[1]
    }
    return undefined
  }
}


export { cmdline }