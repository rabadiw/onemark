import React, { Component } from 'react';
import './marks.view.css';
import { MarksService } from '../../services/marks-service';
import * as _ from 'lodash';
import { openUrl } from '../../lib/env';

// Group state by default
class MarkState {
    constructor(present, model, rawData) {
        this.present = present;
        this.model = model || [];
        this.rawData = rawData;

        this.actions = {
            filter: { name: "Filter", canExecute: true, present: (evt, args) => this.filter(evt, args) },
            fetch: { name: "Fetch", canExecute: true, present: (evt, args) => this.fetch(evt, args) },
            navigateUrl: { name: "Open URL", canExecute: true, present: (evt, args) => this.navigateUrl(evt, args) }
        }
    }

    filter(evt, args) {
        if (args === "") {
            this.presentInternal(this.rawData);
        } else {
            let re = new RegExp(args);
            let nextState = this.rawData.filter(t => re.exec(t.url));
            this.presentInternal(nextState);
        }
    }

    fetch(evt, args) {
        const marksService = new MarksService();
        marksService
            .getMarks()
            .then(results => {

                this.rawData = results;
                this.presentInternal(results);

            }).catch((err) => console.log(err));
    }

    presentInternal(data) {
        var nextState =
            _.chain(data)
                .sortBy("domain")
                .groupBy('domain')
                .toPairs()
                .flatMap(i =>
                    _.chain(i[1])
                        .chunk(2)
                        .map((t, tidx) =>
                            _.zipObject(['title', 'items', 'isPart'], [i[0], t, tidx > 0])
                        ).value()
                ).value();

        this.present(new MarkState(this.present, nextState, this.rawData));
    }

    navigateUrl(evt, args) {
        openUrl(args);
        if (evt) { evt.preventDefault(); }
    }
}



const Header = (props) => {
    if (props.isPart === false) {
        return (
            <div className="section-heading"> <i className="fa fa-bookmark"></i>{props.title}</div>
        )
    } else {
        return <div>No header</div>
    }
}

const MarkGroupItem = (props) => {
    let { url, title, navigate } = props;
    return (
        <div className="section-item" >
            <a href="#" target={url} title={url} onClick={(e) => navigate.present(e, props)}>
                <i className="fa fa-globe" width="24" height="24"></i><span>{title}</span>
            </a>
        </div>
    );
}

const MarkGroup = (props) => {
    const items = props.items.map((v, i) =>
        <MarkGroupItem url={v.url} title={v.url} navigate={props.navigate} key={i} />
    );
    return (
        <div>
            {items}
        </div>
    );
}

const MarkSection = (props) => {
    const listItems = props.model.map((v, i) =>
        <div className="section-group" title={v.title} key={i}>
            <Header {...v} />
            <MarkGroup items={v.items} navigate={props.actions.navigateUrl} />
        </div>
    );

    return (
        <div className="app-mark-section">
            {listItems}
        </div>
    )
}


class Marks extends Component {
    constructor(props) {
        super(props);

        this.state = new MarkState((state) => this.present(state));
    }

    present(state) {
        this.setState(state);
    }

    componentWillMount() {
        // trigger initial load
        this.state.actions.fetch.present(null, null);
    }

    componentWillReceiveProps(nextProps) {
        this.state.actions.filter.present(null, nextProps.filterText);
    }

    render() {
        return (
            <MarkSection {...this.state} />
        )
    }
}

export default Marks;