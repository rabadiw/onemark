// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { AppCopyEvent, AppDeleteEvent, AppOpenEvent, AppSearchEvent, AppUpdateEvent } from './services/OnemarkActions';

// import logo from './logo.svg';

interface IProps {
  dataService: any
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
      next: (v) => {
        this.props.dataService.getItems(v).then((data: []) => {
          this.setState({ items: data })
        })
      }
    });

    AppCopyEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        // TODO:
        alert(`copy: ${v}`);
      }
    });

    AppDeleteEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        // TODO:
        alert(`delete: ${v}`);

      }
    });

    AppOpenEvent.subscribe({
      next: (v: { id: string, url: string, title: string }) => {
        window.open(v.url, v.title);
      }
    });

    AppUpdateEvent.subscribe({
      next: (v: any | undefined) => {
        // TODO:
        alert(`update`);
      }
    })
  }
}

export default App;
