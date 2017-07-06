// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// let apiUrl = (process.env.ONEMARK_API_URL || 'http://localhost:3010/');
// let isDesignMode = (process.env.DESIGN_MODE || false);

try {
  fetch('http://localhost:3001/api/env', {
    headers: { accept: 'application/json' }
  })
    .then(parseJSON)
    .then(startApp);
} catch (e) {
  // NotYetImplmeneted!
}

interface EnvResponse {
  onemark_api_url: String;
  design_mode: Boolean;
}

function parseJSON(response: Response) {
  return response.json();
}
function startApp(env: EnvResponse) {
  let apiUrl = env.onemark_api_url;
  let isDesignMode = env.design_mode;

  ReactDOM.render(
    <AppShell apiUrl={apiUrl} isDesignMode={isDesignMode} />,
    document.getElementById('root') as HTMLElement
  );

}

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

const AppShell = (props) => (
  <MuiThemeProvider>
    <App apiUrl={props.apiUrl} isDeignMode={props.isDesignMode} />
  </MuiThemeProvider>
);