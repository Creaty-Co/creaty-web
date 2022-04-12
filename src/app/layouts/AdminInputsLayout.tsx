import "./AdminInputsLayout.scss"

import { ReactNode } from "react"


interface AdminInputsLayoutProps {
  children: ReactNode
}

function AdminInputsLayout(props: AdminInputsLayoutProps) {
  return (
    <div className="admin-inputs-layout">{props.children}</div>
  )
}


export default AdminInputsLayout
