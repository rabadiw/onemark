// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { envLoader } from "./modules/envLoader";
import { OnemarkStartup } from "./api/onemark.startup";
import { tracer } from "./modules/tracer";

envLoader.init(process.argv);
tracer.info(`Running in ${process.env.RUNTIME_MODE} mode`);

OnemarkStartup
    .init()
    .setTracer(tracer)
    .run();