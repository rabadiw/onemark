import * as React from 'react';

import './SiteCard.css';

interface IMarkItemProps {
  id: string
  url: string
  title: string
  group?: string
  actions: {
    openCommand?: { present: (e: Event, target: { url: string, title: string }) => void },
    deleteCommand?: { present: (e: Event, props: { id: string }) => void },
    copyCommand?: { present: (e: Event, target: { url: string, title: string }) => void }
  }
}

class SiteCard extends React.PureComponent<IMarkItemProps, object> {
  private open: any;
  public constructor(props: IMarkItemProps) {
    super(props);

    this.open = this.openHandler.bind(this);
  }
  public render() {

    const { url, title } = this.props

    return (
      <div className="sitecard">
        <div className="title">
          <a href="#" target={url} title={url} onClick={this.open}>
            <i className="fa fa-bookmark" /><span>{title}</span>
          </a>
        </div>
      </div>
    );
  }

  private openHandler(e: any) {
    const { openCommand } = this.props.actions
    if (openCommand !== undefined) {
      openCommand.present(e.nativeEvent, this.props)
    }
  }
}

export default SiteCard;