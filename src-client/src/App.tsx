// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.css';

import Marks from './components/marks/Mark';
import MarkState from './components/marks/MarkState';
import MarkService, { MarkServiceOption } from './marks/MarkService';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

// import RaisedButton from 'material-ui/RaisedButton';

interface SearchBarProps {
  textChanged(e: Event);
}
const SearchBar = (props: SearchBarProps) => {
  // const handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // };

  return (
    <TextField hintText="Search" type="Search" onChange={props.textChanged} />
  );
};

interface Props {
  apiUrl?: string;
  isDeignMode?: boolean;
}

class App extends React.PureComponent<Props, object> {

  state: MarkState;

  // tslint:disable-next-line
  constructor(props) {
    super(props);

    let markServiceOption: MarkServiceOption = { baseApiUrl: props.apiUrl, isDesignMode: props.isDeignMode };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = new MarkState(new MarkService(markServiceOption), (state) => this.present(state), {}, {});
    this.state.actions.fetch.present(null, null);
  }

  // tslint:disable-next-line
  handleSearchChange(event) {
    // console.log("Search value", event.target.value);
    // tslint:disable-next-line
    this.state.actions.filter.present(null, event.target.value);
  }

  // tslint:disable-next-line
  present(state) {
    this.setState(state);
  }

  render() {
    return (
      <main className="app">
        <AppBar
          title="Onemark"
          className="app-bar"
          style={{ position: 'fixed' }}
          iconElementLeft={<span />}
          iconElementRight={<SearchBar textChanged={this.handleSearchChange} />}
        />
        <div className="main">
          <Marks model={this.state.model} actions={this.state.actions} />
        </div>
        {/*<RaisedButton
          label="Super Secret Password"
          secondary={true}
        />*/}
      </main >
    );
  }
}

export default App;
export { Props };
