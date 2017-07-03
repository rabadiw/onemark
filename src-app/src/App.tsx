// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.css';

import Marks from './components/marks/Mark';
import MarkState from './components/marks/MarkState';
import MarkService from './marks/MarkService';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

//import RaisedButton from 'material-ui/RaisedButton';

interface SearchBarProps {
  textChanged(e)
}
const SearchBar = (props: SearchBarProps) => {
  // const handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // };

  return (
    <TextField hintText="Search" type="Search" onChange={props.textChanged} />
  )
}

interface Props {
  apiUrl?: string,
  isDeignMode?: boolean
}

class App extends React.PureComponent<Props, object> {

  state: MarkState;

  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = new MarkState(new MarkService({ baseApiUrl: props.apiUrl, isDesignMode: props.isDeignMode }), (state) => this.present(state), {}, {});
    this.state.actions.fetch.present(null, null);
  }

  handleSearchChange(event) {
    // console.log("Search value", event.target.value);
    this.state.actions.filter.present(null, event.target.value);
  }

  present(state) {
    this.setState(state);
  }

  render() {
    return (
      <main className="app">
        <AppBar title="Onemark" iconElementLeft={<span></span>} className="app-bar" style={{ position: 'fixed' }} iconElementRight={<SearchBar textChanged={this.handleSearchChange} />} />
        <Marks model={this.state.model} actions={this.state.actions} />
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
