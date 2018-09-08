import * as React from 'react';
import SiteCard from '../components/card/SiteCard'
import './Dashboard.css';

interface IProp {
  items: any[]
}


class Main extends React.PureComponent<IProp, object> {
  public render() {
    const listItems = this.props.items.map((v, i) => {
      return (<SiteCard id={v.id} url={v.url} title={v.title} key={v.id} actions={{}} />)
    })
    return (
      <div className="Main">
        <div className="Main-content">
          {listItems}
        </div>
      </div>
    );
  }
}

export default Main;