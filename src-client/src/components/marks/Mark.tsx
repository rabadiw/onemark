// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './Mark.css';

const Header = (props) => {
    if (props.isPart === false) {
        return (
            <div className="section-heading"> <i className="fa fa-bookmark" />{props.title}</div>
        );
    } else {
        return (
            <div className="section-heading"> <i className="fa fa-bookmark" />No header</div>
        );
    }
};

const MarkGroupItem = (props) => {
    let { url, title, navigate } = props;
    let clickHandler = (e) => navigate.present(e, props);
    return (
        <div className="section-item" >
            <a href="#" target={url} title={url} onClick={clickHandler}>
                <i className="fa fa-globe" width="24" height="24" /><span>{title}</span>
            </a>
        </div>
    );
};

const MarkGroup = (props) => {
    const items = props.items.map((v, i) =>
        <MarkGroupItem url={v.url} title={v.title} navigate={props.navigate} key={i} />
    );
    return (
        <div>
            {items}
        </div>
    );
};

const MarkSection = ({ model, actions }: Props) => {
    if (Array.isArray(model)) {
        let listItems = model.map((v, i) =>
            (
                <div className="section-group" title={v.title} key={i}>
                    <Header {...v} />
                    <MarkGroup items={v.items} navigate={actions.navigateUrl} />
                </div>
            )
        );

        return (
            <div className="app-mark-section">
                {listItems}
            </div>
        );
    } else {
        return (
            <div className="app-mark-section">
                <div className="section-group">
                    No marks found!
                </div>
            </div>
        );
    }
};

interface Props {
    model: Array<any>; // tslint:disable-line
    actions: any; // tslint:disable-line
}

function Marks({ model, actions }: Props) {
    // console.log("The state is " + model);
    // console.log("The state is " + actions);
    return (
        <div className="marks">
            <MarkSection model={model} actions={actions} />
        </div>
    );
}

export default Marks;
export { Props };