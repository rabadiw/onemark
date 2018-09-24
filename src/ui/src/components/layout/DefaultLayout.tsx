// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { AppNotificationEvent, AppSearchEvent, AppUpdateEvent, AppUpdateRestartEvent } from '../../services/OnemarkActions';
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
  snackbar: {
    flex: "1 1 auto",
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
  badgeCount: number | undefined,
}

class DefaultLayout extends React.PureComponent<IProp, object> {
  public static propTypes: { classes: PropTypes.Validator<object>; badgeCount: PropTypes.Validator<number | undefined>; };
  public state = {
    snack: { show: false, message: undefined, action: undefined },
  };
  public constructor(props: IProp) {
    super(props);

    AppNotificationEvent.subscribe({
      next: (v: { message: string, action: any }) => {
        if (!v) { return; }
        this.setState({ snack: { show: true, message: v.message, action: v.action } });
      }
    });
  }
  public render() {
    const { classes, badgeCount } = this.props;

    const pageMoreOptions = [
      // { key: "settings", label: "Settings", icon: (<SettingsIcon />), action: () => { alert('Settings') } },
      // { key: "update", label: "Check for updates...", icon: (<UpdateIcon />), action: this.updateHandler },
    ]
    if (!badgeCount) {
      pageMoreOptions.push({ key: "update", label: "Check for updates...", icon: (<UpdateIcon />), action: this.updateHandler })
    } else {
      pageMoreOptions.push({ key: "update", label: "Update and restart", icon: (<UpdateIcon />), action: this.updateHandler })
    }

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
              badgeConent={this.props.badgeCount}
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
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.snack.show}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-fab-message-id">{this.state.snack.message}</span>}
          action={(
            <div>
              {this.state.snack.action}
              {/* <Button color="inherit" size="small" onClick={this.handleClose}>
                <CloseIcon />
              </Button> */}
            </div>
          )}
          className={classes.snackbar}
        />
      </div>
    );

  }

  private handleClose = () => {
    this.setState({ snack: { show: false } });
  };

  private updateHandler(event: any) {
    if (!this.props || !this.props.badgeCount) {
      AppUpdateEvent.next(undefined);
      AppNotificationEvent.next({
        // action: (
        //   <Button color="inherit" size="small" onClick={this.handleClose}>
        //     Undo
        //   </Button>
        // ),
        action: undefined,
        message: "Checking for update!",
      });
    } else {
      AppUpdateRestartEvent.next();
    }
  }
  private searchChangedHandler(event: any) {
    if (event.nativeEvent.keyCode === 13 && event.type !== 'change') {
      AppSearchEvent.next(event.target.value);
    }
  }
}

export default withStyles(styles)(DefaultLayout);
