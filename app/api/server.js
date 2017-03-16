"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onemark_service_1 = require("./onemark.service");
const tracer = (msg) => { console.log(msg); };
onemark_service_1.OnemarkService(tracer).run();
//# sourceMappingURL=server.js.map