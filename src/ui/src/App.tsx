// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { AppCopyEvent, AppDeleteEvent, AppEventTypes, AppOpenEvent, AppSearchEvent, AppUpdateEvent, AppUpdateRestartEvent, dispatchEvent } from './services/OnemarkActions';
import OnemarkService from './services/OnemarkService';

// import logo from './logo.svg';

interface IProps {
  dataService: OnemarkService | undefined,
}

class App extends React.Component<IProps, object> {
  public state = {
    items: [], // this.props.dataService.getItems(),
    updateApp: false,
  }
  constructor(props: IProps) {
    super(props);
    this.registerEvents();

    AppSearchEvent.next("");
  }
  public render() {
    return (
      <Dashboard items={this.state.items} updateApp={this.state.updateApp} />
    );
  }
  private registerEvents() {
    AppSearchEvent.subscribe({
      next: (v: string) => {
        if (this.props.dataService === undefined) { return; }
        this.props.dataService.getMarks(v).then((data: []) => {
          this.setState({ items: data });
        })
      }
    });

    AppDeleteEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        if (this.props.dataService === undefined) { return; }

        const newMarks = this.state.items.filter((t: any) => t.id !== v.id);
        this.props.dataService.deleteMarks([v]).then(() => {
          this.setState({ items: newMarks });
        });
      }
    });

    AppCopyEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        dispatchEvent(AppEventTypes.copyLink, v);
      }
    });

    AppOpenEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        dispatchEvent(AppEventTypes.openLink, v);
      }
    });

    AppUpdateEvent.subscribe({
      next: (v: any | undefined) => {
        if (v && true === v.hasUpdate) {
          this.setState({ items: this.state.items, updateApp: true });
        } else {
          dispatchEvent(AppEventTypes.checkForUpdate, v);
        }
      }
    });

    AppUpdateRestartEvent.subscribe({
      next: (v: any | undefined) => {
        dispatchEvent(AppEventTypes.updateAndRestart, v);
      }
    });
  }
}

export default App;
