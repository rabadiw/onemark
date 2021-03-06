import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { EditMark } from './Item-Edit'

interface MarkItemMenuProps {
  isPopVisible: boolean
  actions: {
    onEdit?: (e: React.FormEvent<HTMLElement>) => void
    onDelete?: (e: React.FormEvent<HTMLElement>) => void
    onCopy?: (e: React.FormEvent<HTMLElement>) => void
  }
}
const MarkItemMenu = (props: MarkItemMenuProps) => {
  return (
    <div className={props.isPopVisible ? 'menu' : 'menu hidden'} title="Action Menu">
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

interface MarkItemProps {
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
class MarkItem extends React.PureComponent<MarkItemProps, { showMenu: boolean, isEdit: boolean }> {
  open: (e: React.FormEvent<HTMLElement>) => void
  showMenu: (e: React.FormEvent<HTMLElement>) => void
  hideMenu: (e: React.FormEvent<HTMLElement>) => void
  delete: (e: React.FormEvent<HTMLElement>) => void
  edit: (e: React.FormEvent<HTMLElement>) => void
  cancelEdit: (e: React.FormEvent<HTMLElement>) => void
  copy: (e: React.FormEvent<HTMLElement>) => void

  constructor(props: MarkItemProps) {
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
    let { url, title, group } = this.props
    let { showMenu, isEdit } = this.state

    let actions = {
      onEdit: this.edit,
      onDelete: this.delete,
      onCopy: this.copy
    }

    let markElem = (
      <div className="title">
        <a href="#" target={url} title={url} onClick={this.open}>
          <i className="fa fa-bookmark" /><span>{title}</span>
        </a>
      </div>
    )
    if (isEdit) {
      markElem = (<EditMark title={title} cancelEdit={this.cancelEdit} />)
    }

    return (
      <div className="item" title={group} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
        {markElem}
        <MarkItemMenu isPopVisible={showMenu} actions={actions} />
      </div>
    )
  }
}

export { MarkItem }