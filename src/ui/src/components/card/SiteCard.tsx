import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

interface IMarkItemProps {
  classes: any
  id: string
  url: string
  title: string
  subheader?: string
  tags?: string[]
  actions: {
    openCommand?: { present: (e: Event, target: { url: string, title: string }) => void },
    deleteCommand?: { present: (e: Event, props: { id: string }) => void },
    copyCommand?: { present: (e: Event, target: { url: string, title: string }) => void }
  }
}

const styles = (theme: any) => ({
  avatar: {
    
  },
  card: {
    margin: "16px",
    maxWidth: "400px",
  },
  cardContent: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }
})

class SiteCard extends React.PureComponent<IMarkItemProps, object> {
  public state = {
    anchorEl: null,
  };
  private open: any;
  public constructor(props: IMarkItemProps) {
    super(props);

    this.open = this.openHandler.bind(this);
  }
  public render() {

    const { classes } = this.props;

    // const ITEM_HEIGHT = 48;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const options = [
      { name: "Copy Link", icon: (<LinkIcon />) },
      { name: "Delete", icon: (<DeleteIcon />) },
      { name: "Edit", icon: (<EditIcon />) },
    ];
    const { url, title, subheader, tags } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Bookmark" className="avatar">
              <BookmarkIcon />
            </Avatar>
          }
          action={
            <div>
              <IconButton aria-label="More"
                aria-owns={open ? 'sitecard-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="sitecard-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleMenuClose}
              // PaperProps={{
              //   style: {
              //     maxHeight: ITEM_HEIGHT * 4.5,
              //     width: 200,
              //   },
              // }}
              >
                {options.map(option => (
                  <MenuItem key={option.name}
                    selected={option.name === 'Pyxis'}
                    onClick={this.handleMenuClose}
                  >
                    <ListItemIcon >
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText inset={true} primary={option.name} />
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
          title={(<Button onClick={this.open} title={url} style={{ textDecoration: "underline" }}>{title}</Button>)}
          subheader={subheader}
        />
        <CardContent className={classes.cardContent}>
          {(tags || []).map(v => (<span>{v}, </span>))}
        </CardContent>
        {/* <CardActions className="sitecard-actions">
          <IconButton aria-label="Open in new" title={url} onClick={this.open}>
            <OpenInNewIcon />
          </IconButton>
          <IconButton aria-label="Open in new" title={url} onClick={this.open}>
            <EditIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    );
  }

  private handleMenuClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  private openHandler = (e: any) => {
    const { openCommand } = this.props.actions
    if (openCommand !== undefined) {
      openCommand.present(e.nativeEvent, this.props)
    }
    e.defaultPrevented = true;
    return false;
  }
}

// tslint:disable-next-line
(SiteCard as any).propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SiteCard);