// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { appSettings } from "./config/settings"
import { OnemarkService } from "./onemark.service"
let svcOption = {
  tracer: appSettings.tracer,
  port: appSettings.port,
  bodyLimit: appSettings.bodyLimit,
  markDataPath: appSettings.marksDbPath
}
OnemarkService(svcOption).run()
