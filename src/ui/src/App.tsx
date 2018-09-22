// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { AppCopyEvent, AppDeleteEvent, AppOpenEvent, AppSearchEvent, AppUpdateEvent, dispatchEvent } from './services/OnemarkActions';
import OnemarkService from './services/OnemarkService';

// import logo from './logo.svg';

interface IProps {
  dataService: OnemarkService | undefined,
}

class App extends React.Component<IProps, object> {
  public state = {
    items: [] // this.props.dataService.getItems(),
  }
  constructor(props: IProps) {
    super(props);
    this.registerEvents();

    AppSearchEvent.next("");
  }
  public render() {
    return (
      <Dashboard items={this.state.items} />
    );
  }
  private registerEvents() {
    AppSearchEvent.subscribe({
      next: (v: string) => {
        if (this.props.dataService === undefined) { return; }
        this.props.dataService.getMarks(v).then((data: []) => {
          this.setState({ items: data })
        })
      }
    });

    AppDeleteEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        if (this.props.dataService === undefined) { return; }

        const newMarks = this.state.items.filter((t: any) => t.id !== v.id);
        this.props.dataService.deleteMarks([v]).then(() => {

          this.setState({ items: newMarks })
        });
      }
    });

    AppCopyEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        dispatchEvent("copy_link", v)
      }
    });

    AppOpenEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        dispatchEvent("open_link", v);
      }
    });

    AppUpdateEvent.subscribe({
      next: (v: any | undefined) => {
        dispatchEvent("update", {});
      }
    })
  }
}

export default App;
