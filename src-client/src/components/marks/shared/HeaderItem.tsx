import * as React from 'react'

const EmptyHeader = (props) => {
  return (
    // <div className="heading"><i className="fa fa-bookmark" />No header</div>
    <div className="heading hidden">&nbsp;</div>
  )
}

interface HeaderProps {
  title: string
}
const Header = ({ title }: HeaderProps) => {
  return (
    // <div className="heading"><i className="fa fa-bookmark" />{title}</div>
    <div className="heading"><p title={title}>{title}</p></div>
  )
}

export { Header, EmptyHeader }