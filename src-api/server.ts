// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { OnemarkService } from "./onemark.service"
const tracer = (msg) => { console.log(msg) }
OnemarkService(tracer).run()
