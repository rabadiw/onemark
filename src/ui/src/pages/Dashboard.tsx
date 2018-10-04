// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import GridList from '@material-ui/core/GridList';
import * as React from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import SiteCard from '../components/SiteCard';

interface IProp {
  items: any[],
}

const MarkGridView = (props: IProp) => {

  const listItems = props.items.map((v, i) => {
    return (<SiteCard key={i} id={v.id} url={v.url} title={v.title} tags={v.tags} subheader={v.domain} />)
  })

  return (
    <GridList cellHeight={180} className="mark-grid">
      {listItems}
    </GridList>
  )
}

// main component
class Main extends React.PureComponent<{ items: any[], updateApp: boolean }, object> {
  public render() {
    return (
      <DefaultLayout badgeCount={this.props.updateApp ? 1 : undefined}>
        <MarkGridView items={this.props.items} />
      </DefaultLayout>
    );
  }
}

export default Main;