"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Levels;
(function (Levels) {
    Levels[Levels["error"] = 0] = "error";
    Levels[Levels["warn"] = 1] = "warn";
    Levels[Levels["info"] = 2] = "info";
    Levels[Levels["debug"] = 3] = "debug";
})(Levels || (Levels = {}));
function pad(val, zeros) {
    zeros = zeros || 2;
    return (new Array(zeros + 1).join('0') + val).substr(-zeros, zeros);
}
function formatConsole(msg) {
    var ts = pad(msg.date.getHours()) + ':' +
        pad(msg.date.getMinutes()) + ':' +
        pad(msg.date.getSeconds()) + ':' +
        pad(msg.date.getMilliseconds(), 4);
    return `[${ts}] [${msg.level}] ${msg.text}`;
}
const log = (level, msg) => {
    console.log(formatConsole({ date: new Date(), level: level, text: msg }));
};
let tracer = {};
exports.tracer = tracer;
tracer.info = (msg) => { log(Levels[Levels.info], msg); };
tracer.warn = (msg) => { log(Levels[Levels.warn], msg); };
tracer.error = (msg) => { log(Levels[Levels.error], msg); };
tracer.debug = (msg) => { log(Levels[Levels.debug], msg); };
//# sourceMappingURL=tracer.js.map