import GridList from '@material-ui/core/GridList';
import * as React from 'react';
import SiteCard from '../components/card/SiteCard'
import './Dashboard.css';

interface IProp {
  items: any[]
}

const MarkGridView = (props: IProp) => {

  const listItems = props.items.map((v, i) => {
    return (<SiteCard id={v.id} url={v.url} title={v.title} key={v.id} tags={v.tags} subheader={v.domain} actions={{}} />)
  })

  return (
    <GridList cellHeight={180} className="mark-grid">
      {listItems}
    </GridList>
  )

}

// main component
class Main extends React.PureComponent<IProp, object> {
  public render() {
    return (
      <div className="main">
        <div className="main-content">
          <MarkGridView items={this.props.items} />
        </div>
      </div>
    );
  }
}

export default Main;