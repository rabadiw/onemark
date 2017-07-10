// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

fetch('http://localhost:3001/api/env', {
  headers: { accept: 'application/json' }
})
  .then(parseJSON)
  .then(startApp).catch((err) => {
    // not the best solution, but will do for now.
    startApp({ onemark_api_url: 'http://localhost:32801/', design_mode: false });
  });

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