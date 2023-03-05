import "./AdminGroupLayout.scss"

import Icon from "app/components/common/Icon/Icon"
import { ReactNode } from "react"


interface AdminGroupLayoutProps {
  title: string
  children: ReactNode
}

function AdminGroupLayout(props: AdminGroupLayoutProps) {
  return (
    <div className="admin-group-layout">
      <div className="admin-group-layout__header">
        <Icon className="admin-group-layout__icon" name="chevron" />
        <h3 className="admin-group-layout__title heading">{props.title}</h3>
      </div>
      <div className="admin-group-layout__container">{props.children}</div>
    </div>
  )
}


export default AdminGroupLayout
