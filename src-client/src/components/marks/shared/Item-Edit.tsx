import * as React from 'react'

const EditMark = (props: { title: string, cancelEdit: (e: React.FormEvent<HTMLElement>) => void }) => {
  let { title, cancelEdit } = props
  return (
    <div className="item edit">
      <input defaultValue={title} type="text" />
      <i className="fa fa-check" />
      <i className="fa fa-times" onClick={cancelEdit} />
    </div>
  )
}

export { EditMark }