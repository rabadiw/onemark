// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { AppCopyEvent, AppDeleteEvent, AppOpenEvent } from '../services/OnemarkActions';
import IconButtonMenu from './IconButtonMenu';
// import Typography from '@material-ui/core/Typography';

const styles = (theme: any) => ({
  avatar: {

  },
  card: {
    margin: "16px 0 0 16px",
    width: "350px",
  },
  cardContent: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    "font-size": "small",
    "height": 48,
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
  },
  cardHeader: {
    display: "flex",
    height: 100,
  },
  cardTitle: {
    cursor: "pointer",
    margin: 0,
    maxHeight: 48,
    overflow: "hidden",
    "text-align": "left",
    "text-decoration": "underline",
    "text-overflow": "ellipsis",
    "text-transform": "capitalize",
    "white-space": "normal",
  },
  tag: {
    "&:after": {
      "content": "','",
    },
    "&:last-child:after": {
      "content": "none"
    },
    padding: "0 6px 0 0",
  }
})

interface IMarkItemProps {
  classes: any
  id: string
  url: string
  title: string
  subheader?: string
  tags?: string[]
}

class SiteCard extends React.PureComponent<IMarkItemProps, object> {
  // public static propTypes: { classes: PropTypes.Validator<object>; };
  public state = {
    anchorEl: null,
  };
  public constructor(props: IMarkItemProps) {
    super(props);
  }
  public render() {

    const { classes } = this.props;
    const { url, title, subheader, tags } = this.props;
    const renderTags = (tagItems: string[]) => {
      return (
        tagItems.map((v, i) => (<span className={classes.tag} key={i}>{v}</span>))
      )
    };

    return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Bookmark" className="avatar">
              <BookmarkIcon />
            </Avatar>
          }
          action={
            <IconButtonMenu
              icon={(<MoreVertIcon />)}
              key="sitecardMenu"
              label="Site card more menu"
              menuOptions={
                [
                  { key: "copyLink", label: "Copy link", icon: (<LinkIcon />), action: this.copyLinkHandler },
                  { key: "delete", label: "Delete", icon: (<DeleteIcon />), action: this.deleteHandler },
                  // { key: "edit", label: "Edit", icon: (<EditIcon />), action: () => { alert('edit') } },
                ]}
            />
          }
          title=
          {<p
            onClick={this.openHandler}
            title={`${title}\n${url}`}
            className={classes.cardTitle}
          >{title}</p>}
          subheader={subheader}
        />
        <CardContent className={classes.cardContent} title={(tags||[]).join(", ")}>
          {renderTags((tags || []))}
        </CardContent>
      </Card>
    );
  }

  private copyLinkHandler = (e: any) => {
    const { id, url, title } = this.props;
    AppCopyEvent.next({ id, url, title });
  }
  private deleteHandler = (e: any) => {
    const { id, url, title } = this.props;
    AppDeleteEvent.next({ id, url, title });
  }
  private openHandler = (e: any) => {
    const { id, url, title } = this.props;
    AppOpenEvent.next({ id, url, title });
  }
}

export default withStyles(styles)(SiteCard);