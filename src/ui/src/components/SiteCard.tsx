// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { MarkOpenEvent } from '../services/OnemarkActions';
import IconButtonMenu from './IconButtonMenu';
// import Typography from '@material-ui/core/Typography';

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

interface IMarkItemProps {
  classes: any
  id: string
  url: string
  title: string
  subheader?: string
  tags?: string[]
  // actions: {
  //   openCommand?: { present: (e: Event, target: { url: string, title: string }) => void },
  //   deleteCommand?: { present: (e: Event, props: { id: string }) => void },
  //   copyCommand?: { present: (e: Event, target: { url: string, title: string }) => void }
  // }
}

class SiteCard extends React.PureComponent<IMarkItemProps, object> {
  // public static propTypes: { classes: PropTypes.Validator<object>; };
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

            <IconButtonMenu
              icon={(<MoreVertIcon />)}
              key="sitecardMenu"
              label="Site card more menu"
              menuOptions={
                [
                  { key: "copyLink", label: "Copy link", icon: (<LinkIcon />), action: () => { alert('copy') } },
                  { key: "delete", label: "Delete", icon: (<DeleteIcon />), action: () => { alert('delete') } },
                  { key: "edit", label: "Edit", icon: (<EditIcon />), action: () => { alert('edit') } },
                ]}
            />
          }
          title={(<Button onClick={this.open} title={url} style={{ textDecoration: "underline" }}>{title}</Button>)}
          subheader={subheader}
        />
        <CardContent className={classes.cardContent}>
          {(tags || []).map(v => (<span key={v}>{v}, </span>))}
        </CardContent>
      </Card>
    );
  }

  private openHandler = (e: any) => {
    // const { openCommand } = this.props.actions
    // if (openCommand !== undefined) {
    //   openCommand.present(e.nativeEvent, this.props)
    // }
    MarkOpenEvent.next(this.props.url);
    e.defaultPrevented = true;
    return false;
  }
}

export default withStyles(styles)(SiteCard);