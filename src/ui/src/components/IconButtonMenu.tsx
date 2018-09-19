// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { withStyles } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import * as PropTypes from 'prop-types';
import * as React from 'react';

const styles = (theme: any) => ({
});

interface IMenuOption {
  key: string,
  label: string,
  icon: React.ReactElement<any>,
  action: (event: Event) => void
}

interface IIconButtonMenu {
  badgeConent?: any,
  classes: any,
  key: string | number,
  label: string,
  icon: React.ReactElement<any>,
  menuOptions: IMenuOption[]
}

const ITEM_HEIGHT = 48;
class IconButtonMenu extends React.PureComponent<IIconButtonMenu, object> {
  // public static propTypes: { classes: PropTypes.Validator<object>; };
  public state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };
  public render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-haspopup="true"
          aria-label={this.props.label}
          aria-owns={isMenuOpen ? `menu-${this.props.key}` : undefined}
          className={classes.settings}
          color="inherit"
          onClick={this.handleMenuClick}
        >
          {
            ((this.props.badgeConent) ?
              <Badge className={classes.margin} badgeContent={1} color="secondary">
                {this.props.icon}
              </Badge> :
              this.props.icon
            )
          }
          {/* <Badge className={classes.margin} badgeContent={1} color="secondary">
            {this.props.icon}
          </Badge> */}
        </IconButton>
        <Menu
          id={`menu-${this.props.key}`}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              maxWidth: 400,
            },
          }}
        >
          {this.props.menuOptions.map(option => (
            <MenuItem key={option.key}
              id={option.key}
              selected={option.key === 'Pyxis'}
              onClick={this.handleMenuClose}
            >
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
              <ListItemText inset={true} primary={option.label} />
            </MenuItem>
          ))}
        </Menu>
      </div >
    )
  }

  private handleMenuClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = (event: any) => {
    this.setState({ anchorEl: null });

    const selectedOption = this.props.menuOptions.find(v => v.key === event.currentTarget.id)
    if (selectedOption) {
      selectedOption.action(event);
    }

  };

}

export default withStyles(styles)(IconButtonMenu);