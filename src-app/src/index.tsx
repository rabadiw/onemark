// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Electron from 'electron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

if (process && process.versions.electron) {
  require('dotenv').config({ path: "./app/.env" })
  //require("./renderer.js")
} else {
  require('dotenv').config({ path: "./.env" })
}

const apiUrl = (process.env.ONEMARK_API_URL || "http://localhost:3010/api/");
const isDesignMode = (process.env.DESIGN_MODE || false);

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

// onTouchTap support
injectTapEventPlugin();

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();

const AppShell = () => (
  <MuiThemeProvider>
    <App apiUrl={apiUrl} isDeignMode={isDesignMode} />
  </MuiThemeProvider>
);

ReactDOM.render(
  <AppShell />,
  document.getElementById('root') as HTMLElement
);


