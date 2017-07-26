// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react'
import './Mark.css'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const Header = (props) => {
    if (props.isPart === false) {
        return (
            <div className="heading"> <i className="fa fa-bookmark" />{props.title}</div>
        )
    } else {
        return (
            <div className="heading"> <i className="fa fa-bookmark" />No header</div>
        )
    }
}

interface MarkItemMenuProps {
    isPopVisible: boolean
    actions: {
        onEdit?: (e: React.FormEvent<HTMLElement>) => void
        onDelete?: (e: React.FormEvent<HTMLElement>) => void
        onCopy?: (e: React.FormEvent<HTMLElement>) => void
    }
}
const MarkGroupItemMenu = (props: MarkItemMenuProps) => {
    return (
        <div className={props.isPopVisible ? 'menu' : 'menu hidden'}>
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                {/* <MenuItem primaryText="Edit" onClick={props.onEdit} /> */}
                <MenuItem primaryText="Copy Link" onClick={props.actions.onCopy} />
                <MenuItem primaryText="Delete" onClick={props.actions.onDelete} />
            </IconMenu>
        </div>)
}

const EditMark = (props: { title: string, cancelEdit: (e: React.FormEvent<HTMLElement>) => void }) => {
    let { title, cancelEdit } = props
    return (
        <div className="item edit">
            <input defaultValue={title} type="text" />
            <i className="fa fa-check" width="24" height="24" />
            <i className="fa fa-times" width="24" height="24" onClick={cancelEdit} />
        </div>
    )
}

interface MarkGroupItemProps {
    id: string
    url: string
    title: string
    actions: {
        openCommand?: { present: (e: Event, target: { url: string, title: string }) => void },
        deleteCommand?: { present: (e: Event, props: { id: string }) => void },
        copyCommand?: { present: (e: Event, target: { url: string, title: string }) => void }
    }
}
class MarkGroupItem extends React.PureComponent<MarkGroupItemProps, { showMenu: boolean, isEdit: boolean }> {
    open: (e: React.FormEvent<HTMLElement>) => void
    showMenu: (e: React.FormEvent<HTMLElement>) => void
    hideMenu: (e: React.FormEvent<HTMLElement>) => void
    delete: (e: React.FormEvent<HTMLElement>) => void
    edit: (e: React.FormEvent<HTMLElement>) => void
    cancelEdit: (e: React.FormEvent<HTMLElement>) => void
    copy: (e: React.FormEvent<HTMLElement>) => void

    constructor(props: MarkGroupItemProps) {
        super(props)
        this.state = { showMenu: false, isEdit: false }

        this.open = this.openHandler.bind(this)
        this.showMenu = this.showMenuHandler.bind(this)
        this.hideMenu = this.hideMenuHandler.bind(this)
        this.delete = this.deleteHandler.bind(this)
        this.edit = this.editClickHandler.bind(this)
        this.cancelEdit = this.cancelEditHandler.bind(this)
        this.copy = this.copyHandler.bind(this)
    }

    openHandler(e: React.FormEvent<HTMLAnchorElement>) {
        let { openCommand } = this.props.actions
        if (openCommand !== undefined) {
            openCommand.present(e.nativeEvent, this.props)
        }
    }
    deleteHandler(e: React.FormEvent<HTMLElement>) {
        // can API to delete item
        let { deleteCommand } = this.props.actions
        if (deleteCommand) {
            deleteCommand.present(e.nativeEvent, this.props)
        }
    }
    copyHandler(e: React.FormEvent<HTMLElement>) {
        let { copyCommand } = this.props.actions
        if (copyCommand) {
            copyCommand.present(e.nativeEvent, this.props)
        }
    }
    showMenuHandler(e: React.FormEvent<HTMLElement>) {
        if (this.state.isEdit === false) {
            this.setState({ showMenu: true })
        }
    }
    hideMenuHandler(e: React.FormEvent<HTMLElement>) {
        this.setState({ showMenu: false })
    }
    editClickHandler(e: React.FormEvent<HTMLElement>) {
        this.setState({ showMenu: false, isEdit: true })
    }
    cancelEditHandler(e: React.FormEvent<HTMLElement>) {
        let canceledState = Object.assign(this.state, { showMenu: false, isEdit: false })
        this.setState(canceledState)
    }

    render() {
        let { url, title } = this.props
        let { showMenu, isEdit } = this.state

        let actions = {
            onEdit: this.edit,
            onDelete: this.delete,
            onCopy: this.copy
        }

        let markElem = (
            <a href="#" target={url} title={url} onClick={this.open}>
                <i className="fa fa-globe" width="24" height="24" /><span>{title}</span>
            </a>)
        if (isEdit) {
            markElem = (<EditMark title={title} cancelEdit={this.cancelEdit} />)
        }

        return (
            <div className="item" onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                <MarkGroupItemMenu isPopVisible={showMenu} actions={actions} />
                {markElem}
            </div>
        )
    }
}

const MarkGroup = (props) => {
    const items = props.items.map((v, i) =>
        <MarkGroupItem id={v.id} url={v.url} title={v.title} actions={props.actions} key={i} />
    )
    return (
        <div>
            {items}
        </div>
    )
}

const MarkSection = ({ model, actions }: Props) => {
    if (Array.isArray(model) && model.length > 0) {

        const cmds = {
            openCommand: actions.openMark,
            deleteCommand: actions.deleteMark,
            copyCommand: actions.copyMark
        }

        let listItems = model.map((v, i) =>
            (
                <div className="group" title={v.title} key={i}>
                    <Header {...v} />
                    <MarkGroup items={v.items} actions={cmds} />
                </div>
            )
        )

        return (
            <div className="section grid">
                {listItems}
            </div>
        )

    } else {
        return (
            <div className="section empty">
                <div className="group">
                    No marks found!
                </div>
            </div>
        )
    }
}

interface Props {
    model: Array<any> // tslint:disable-line
    actions: any // tslint:disable-line
}

function Marks({ model, actions }: Props) {
    return (
        <div className="marks">
            <MarkSection model={model} actions={actions} />
        </div>
    )
}

export default Marks
export { Props }