// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { AppSearchEvent, AppUpdateEvent } from '../../services/OnemarkActions';
import IconButtonMenu from '../IconButtonMenu';

const styles = (theme: any) => ({
  grow: {
    flexGrow: 1,
  },
  inputInput: {
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      '&:focus': {
        width: 200,
      },
      width: 120,
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  search: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing.unit * 2,
    // position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    'pointer-events': 'none',
    // position: "relative",
    width: theme.spacing.unit * 5,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
})

interface IProp {
  classes: any,
}

class DefaultLayout extends React.PureComponent<IProp, object> {
  public static propTypes: { classes: PropTypes.Validator<object>; };
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography className={classes.title} variant="title" color="inherit" noWrap={true}>
              Onemark
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search} style={{ position: "relative" }}>
              <div className={classes.searchIcon} style={{ position: "absolute" }}>
                <SearchIcon />
              </div>
              <Input id="app-search"
                classes={{
                  input: classes.inputInput,
                  root: classes.inputRoot,
                }}
                disableUnderline={true}
                placeholder="Search…"
                onKeyPress={this.searchChangedHandler}
                onChange={this.searchChangedHandler}
              />
            </div>
            <IconButtonMenu
              badgeConent={1}
              icon={(<SettingsIcon />)}
              key="settingsMenu"
              label="settings menu"
              menuOptions={
                [
                  // { key: "settings", label: "Settings", icon: (<SettingsIcon />), action: () => { alert('Settings') } },
                  { key: "update", label: "Check for updates...", icon: (<UpdateIcon />), action: this.updateHandler },
                ]}
            />
          </Toolbar>
        </AppBar>
        <div className="main">
          <div className="main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  private updateHandler(event: any) {
    AppUpdateEvent.next(undefined);
  }
  private searchChangedHandler(event: any) {
    if (event.nativeEvent.keyCode === 13 && event.type !== 'change') {
      AppSearchEvent.next(event.target.value);
    }
  }
}

export default withStyles(styles)(DefaultLayout);
