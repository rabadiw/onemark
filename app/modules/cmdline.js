"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class cmdline {
    static getArg(args, argName) {
        const regex = new RegExp(`^${argName}[=]?`);
        const cmdDevPredicate = v => regex.test(v);
        return args.find(cmdDevPredicate);
    }
    static getArgValue(args, argName) {
        let v = this.getArg(args, argName);
        if (v !== undefined && v.indexOf('=') > 0) {
            return this.getArg(args, argName).split('=')[1];
        }
        return undefined;
    }
}
exports.cmdline = cmdline;
//# sourceMappingURL=cmdline.js.map