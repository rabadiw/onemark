// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as Electron from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'
import './index.css'
// import registerServiceWorker from './registerServiceWorker'
import CloudBackend from './gcp'

interface EnvResponse {
  onemark_api_url: String
  design_mode: Boolean
}

function parseJSON(response: Response) {
  return response.json()
}
function startApp(env: EnvResponse) {
  let apiUrl = env.onemark_api_url.toString()
  let isDesignMode = env.design_mode.valueOf()

  ReactDOM.render(
    <AppShell apiUrl={apiUrl} isDesignMode={isDesignMode} />,
    document.getElementById('root') as HTMLElement
  )

}

// Themed Shell
const AppShell = (props) => (
  <MuiThemeProvider>
    <App apiUrl={props.apiUrl} isDeignMode={props.isDesignMode} />
  </MuiThemeProvider>
)

// onTouchTap support
injectTapEventPlugin()

// <-- old render code
// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// )
// registerServiceWorker()
// --> end old render code

CloudBackend.initalize()

// Start up code
fetch('http://localhost:3001/api/env', { headers: { accept: 'application/json' } })
  .then(parseJSON)
  .then(startApp)
  .catch((err) => {
    // not the best solution, but will do for now.
    startApp({ onemark_api_url: 'http://localhost:32801/', design_mode: false })
  })
