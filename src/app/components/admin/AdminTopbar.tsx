import "./admin.scss"

import { UserType } from "interfaces/user"
import { useSelector } from "react-redux"

import ButtonLink from "../common/Button/ButtonLink"


function AdminTopbar() {
  const user = useSelector(state => state.user)
  if (!user.auth || user.type < UserType.admin) return null
  return (
    <div className="admin-topbar">
      <AdminTopbarMenu />
    </div>
  )
}

function AdminTopbarMenu() {
  return (
    <div className="admin-topbar__menu">
      <ButtonLink to="/admin">фыв</ButtonLink>
      <ButtonLink to="/admin/topics-tags">Тэги</ButtonLink>
      <ButtonLink to="/admin/mentors">Менторы</ButtonLink>
    </div>
  )
}


export default AdminTopbar
