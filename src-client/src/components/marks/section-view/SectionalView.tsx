import * as React from 'react'
import { Header, EmptyHeader } from '../shared/HeaderItem'
import { MarkItem } from '../shared/Item'

const MarkGroup = (props) => {
  const items = props.items.map((v, i) =>
    <MarkItem id={v.id} url={v.url} title={v.title} group={props.group} actions={props.actions} key={i} />
  )
  return (
    <div className="group">
      {items}
    </div>
  )
}

interface Props {
  model: Array<any> // tslint:disable-line
  actions: any // tslint:disable-line
}
const MarkSection = ({ model, actions }: Props) => {

  const cmds = {
    openCommand: actions.openMark,
    deleteCommand: actions.deleteMark,
    copyCommand: actions.copyMark
  }

  const HeaderWrapper = (props) => {
    if (props.isPart === false) {
      return (
        <Header title={props.title} />
      )
    }
    return (<EmptyHeader />)
  }

  let listItems = model.map((v, i) =>
    (
      <div className="section" title={v.title} key={i}>
        <HeaderWrapper {...v} />
        <MarkGroup group={v.title} items={v.items} actions={cmds} />
      </div>
    )
  )

  return (
    <div className="grid">
      {listItems}
    </div>
  )
}

export default MarkSection