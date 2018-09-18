// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { MarkOpenEvent, SearchEvent } from './services/OnemarkActions';

// import logo from './logo.svg';

interface IProps {
  dataService: any
}

class App extends React.Component<IProps, object> {
  public state = {
    items: this.props.dataService.getItems(),
  }
  constructor(props: IProps) {
    super(props);

    SearchEvent.subscribe({
      next: (v) => {
        this.setState({ items: this.props.dataService.getItems(v) });
      }
    });

    MarkOpenEvent.subscribe({
      next: (v: string) => {
        window.open(v, "_blank");
      }
    })
  }
  public render() {
    return (
      <Dashboard items={this.state.items} />
    );
  }
}

export default App;
