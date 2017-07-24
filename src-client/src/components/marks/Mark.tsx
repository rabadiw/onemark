// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react';
import './Mark.css';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Header = (props) => {
    if (props.isPart === false) {
        return (
            <div className="heading"> <i className="fa fa-bookmark" />{props.title}</div>
        );
    } else {
        return (
            <div className="heading"> <i className="fa fa-bookmark" />No header</div>
        );
    }
};

interface MarkItemMenuProps {
    isPopVisible: boolean;
    onEdit?: (e: any) => void;
    onDelete?: (e: any) => void;
}
const MarkGroupItemMenu = (props: MarkItemMenuProps) => {
    return (
        <div className={props.isPopVisible ? "menu" : "menu hidden"}>
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                {/* <MenuItem primaryText="Edit" onClick={props.onEdit} /> */}
                <MenuItem primaryText="Delete" onClick={props.onDelete} />
            </IconMenu>
        </div>)
}

const EditMark = (props: { title: string, cancelEdit: () => void }) => {
    let { title, cancelEdit } = props;
    return (
        <div className="item edit">
            <input defaultValue={title} type="text" />
            <i className="fa fa-check" width="24" height="24" />
            <i className="fa fa-times" width="24" height="24" onClick={cancelEdit} />
        </div>
    )
}

interface MarkGroupItemProps {
    id: string;
    url: string;
    title: string;
    navigate?: { present: (e, props) => void };
    delete?: { present: (e, props) => void }
}
class MarkGroupItem extends React.PureComponent<MarkGroupItemProps, { showMenu: boolean, isEdit: boolean }> {
    delete: any;
    edit: any;
    cancelEdit: any;
    hideMenu: any;
    showMenu: any;
    openUrl: any;
    constructor(props) {
        super(props);
        this.state = { showMenu: false, isEdit: false };

        this.openUrl = this.openUrlHandler.bind(this);
        this.showMenu = this.showMenuHandler.bind(this);
        this.hideMenu = this.hideMenuHandler.bind(this);
        this.edit = this.editClickHandler.bind(this);
        this.cancelEdit = this.cancelEditHandler.bind(this);
        this.delete = this.deleteHandler.bind(this);
    }

    openUrlHandler(e) {
        if (this.props.navigate) {
            this.props.navigate.present(e, this.props)
        }
    }
    deleteHandler(e) {
        // can API to delete item
        if (this.props.delete) {
            this.props.delete.present(e, this.props)
        }
    }
    showMenuHandler(e) {
        if (this.state.isEdit == false) {
            this.setState({ showMenu: true })
        }
    };
    hideMenuHandler(e) {
        this.setState({ showMenu: false })
    }
    editClickHandler(e) {
        this.setState({ showMenu: false, isEdit: true })
    };
    cancelEditHandler(e) {
        //let canceledState = Object.assign(this.state, { isEdit: false })
        //this.setState(canceledState)
        this.setState({ showMenu: false, isEdit: false })
    }

    render() {
        let { url, title } = this.props;
        let { showMenu, isEdit } = this.state;

        let markElem = (
            <a href="#" target={url} title={url} onClick={this.openUrl}>
                <i className="fa fa-globe" width="24" height="24" /><span>{title}</span>
            </a>);
        if (isEdit) {
            markElem = (<EditMark title={title} cancelEdit={this.cancelEdit} />)
        }

        return (
            <div className="item" onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                <MarkGroupItemMenu isPopVisible={showMenu} onEdit={this.edit} onDelete={this.delete} />
                {markElem}
            </div>
        );
    }
};

const MarkGroup = (props) => {
    const items = props.items.map((v, i) =>
        <MarkGroupItem id={v.id} url={v.url} title={v.title} navigate={props.navigate} delete={props.delete} key={i} />
    );
    return (
        <div>
            {items}
        </div>
    );
};

const MarkSection = ({ model, actions }: Props) => {
    if (Array.isArray(model) && model.length > 0) {
        let listItems = model.map((v, i) =>
            (
                <div className="group" title={v.title} key={i}>
                    <Header {...v} />
                    <MarkGroup items={v.items} navigate={actions.navigateUrl} delete={actions.delete} />
                </div>
            )
        );

        return (
            <div className="section grid">
                {listItems}
            </div>
        );

    } else {
        return (
            <div className="section empty">
                <div className="group">
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
    return (
        <div className="marks">
            <MarkSection model={model} actions={actions} />
        </div>
    );
}

export default Marks;
export { Props };