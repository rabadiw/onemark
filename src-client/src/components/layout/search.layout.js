// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import React, { Component } from 'react';
import './layout.css';
import logo from '../../assets/icon-48.png';

class SearchLayout extends Component {
  constructor(props) {
    super(props);

    this.onSearchChange = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(evt) {
    if (evt.nativeEvent.keyCode === 13 || evt.type === 'change') {
      if (this.props.onSearchChange) {
        this.props.onSearchChange({ search: evt.target.value });
      }
    }
  }
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">

        <div className="app-header mdl-layout__header mdl-layout__header--waterfall">
          <div className="mdl-layout__header-row">
            <span className="app-title mdl-layout-title">Onemark</span>
            {/** <!-- Add spacer, to align navigation to the right in desktop -->*/}
            <div className="app-header-spacer mdl-layout-spacer"></div>
            <div className="app-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-field">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="search" id="search-field" onKeyPress={this.onSearchChange} onChange={this.onSearchChange} />
                <label className="mdl-textfield__label" htmlFor="search-field">Search</label>
              </div>
            </div>
            {/** <!-- Navigation -->*/}
            <div className="app-navigation-container">
              <nav className="app-navigation mdl-navigation">
                {/** <!--<a className="mdl-navigation__link mdl-typography--text-uppercase" href="">Phones</a>-->*/}
              </nav>
            </div>
            {/** 
            <span className="app-mobile-title mdl-layout-title">
              <img className="app-logo-image" src={logo}/>
            </span>
            */}
            {/** 
            <button className="app-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
              <i className="material-icons">more_vert</i>
            </button>
            */}
          </div>
        </div>

        <div className="app-drawer mdl-layout__drawer">
          <span className="mdl-layout-title"><img src={logo} role="presentation" /> Onemark</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="./">Home</a>
            <a className="mdl-navigation__link" href="./about">About</a>
            {/**
            <div className="app-drawer-separator"></div>
            <span className="mdl-navigation__link" href="">Versions</span>
            <a className="mdl-navigation__link" href="">item 2</a>
             */}
          </nav>
        </div>

        <div className="app-content mdl-layout__content">
          <a name="top"></a>

          {this.props.children}

        </div>
      </div>
    );
  }
}

export default SearchLayout;