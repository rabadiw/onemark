import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
// import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import * as React from 'react';
// import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import './SiteCard.css';

interface IMarkItemProps {
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

    // const ITEM_HEIGHT = 48;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const options = ["Edit"];
    const { url, title, subheader, tags } = this.props

    return (
      <Card className="sitecard">
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
                  <MenuItem key={option}
                    selected={option === 'Pyxis'}
                    onClick={this.handleMenuClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
          title={(<Button onClick={this.open} title={url} style={{ textDecoration: "underline" }}>{title}</Button>)}
          subheader={subheader}
        />
        <CardContent className="sitecard-content">
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

export default SiteCard;