// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

// import blue from '@material-ui/core/colors/blue';
// import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import OnemarkService from './services/OnemarkService';
// import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    // primary: blueGrey,
    // secondary: blue,
    type: "dark"
  },
});

// not needed for electron
// registerServiceWorker();

interface IEnvResponse {
  onemark_endpoint: string
  design_mode: boolean
}

interface IStartContext {
  envEndpoint: string,
  apiEndpoint: string,
  appHTMLElement: string
}

class Starup {
  private ctx: IStartContext;
  public with(ctx: IStartContext) {
    this.ctx = ctx;
    return this;
  }

  public run() {
    this.load();
  }

  private parseJSON(response: Response) {
    return response.json()
  }

  private startApp(env: IEnvResponse) {
    // const isDesignMode = env.design_mode.valueOf()
    const dataService = (new OnemarkService())
      .with({ apiUrl: env.onemark_endpoint.valueOf() })

    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App dataService={dataService} />
      </MuiThemeProvider>,
      document.getElementById(this.ctx.appHTMLElement) as HTMLElement
    )
  }

  private load() {
    fetch(this.ctx.envEndpoint, { headers: { accept: 'application/json' } })
      .then(this.parseJSON)
      .then(this.startApp)
      .catch((err) => {
        // not the best solution, but will do for now.
        this.startApp({ onemark_endpoint: this.ctx.apiEndpoint, design_mode: false })
      })
  }
}

// Load the UI
(new Starup())
  .with({
    apiEndpoint: 'http://localhost:32801/',
    appHTMLElement: "root",
    envEndpoint: 'http://localhost:3001/api/env',
  }).run();