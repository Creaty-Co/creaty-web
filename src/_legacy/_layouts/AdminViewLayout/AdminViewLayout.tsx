import "./AdminViewLayout.scss"

import { ReactNode } from "react"


interface AdminViewLayoutProps {
  maxWidth?: string
  children: ReactNode
}

function AdminViewLayout(props: AdminViewLayoutProps) {
  return (
    <div className="admin-view-layout" style={{ "--admin-view-maxWidth": props.maxWidth }}>
      <h1 className="admin-view-layout__title heading">Админ-панель</h1>
      <div className="admin-view-layout__container">
        {props.children}
      </div>
    </div>
  )
}


export default AdminViewLayout
