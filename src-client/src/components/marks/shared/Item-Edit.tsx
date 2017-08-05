import * as React from 'react'

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

export { EditMark }