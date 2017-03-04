// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app, shell} = require('electron');
require('./assets/js/notification.js')