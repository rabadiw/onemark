import * as React from 'react'
import { Header, EmptyHeader } from '../shared/HeaderItem'
import { MarkItem } from '../shared/Item'

const MarkGroup = (props) => {
  const items = props.items.map((v, i) =>
    <MarkItem id={v.id} url={v.url} title={v.title} actions={props.actions} key={i} />
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
const MarkGridView = ({ model, actions }: Props) => {

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

  // let listItems = model.map((v, i) =>
  //   (
  //     <div className="section" title={v.title} key={i}>
  //       <HeaderWrapper {...v} />
  //       <MarkGroup items={v.items} actions={cmds} />
  //     </div>
  //   )
  // )

  let listItems = model.map((v, i) => {
    //listItems.push((<HeaderWrapper {...v} />))
    return [<Header title={v.title} />, v.items.map((v2, i2) => (<MarkItem id={v2.id} url={v2.url} title={v2.title} actions={cmds} group={v.title} key={`${v2.id}`} />))]
  })

  return (
    <div className="grid">
      {listItems}
    </div>
  )
}

export default MarkGridView