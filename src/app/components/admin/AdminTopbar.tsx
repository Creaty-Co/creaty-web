import "./admin.scss"

import { UserType } from "interfaces/user"
import { useDispatch, useSelector } from "react-redux"
import { updateAdminEditing } from "redux/reducers/admin"

import Button from "../common/Button/Button"
import ButtonLink from "../common/Button/ButtonLink"


function AdminTopbar() {
  const dispatch = useDispatch()

  const admin = useSelector(state => state.admin)
  const user = useSelector(state => state.user)
  if (!user.auth || user.type < UserType.admin) return null

  const toggleEditing = () => {
    if (admin.editing === true) {
      window.location.reload()
    }
    dispatch(updateAdminEditing(!admin.editing))
  }
  return (
    <div className="admin-topbar">
      <div className="admin-topbar__edit">
        <Button style={admin.editing ? "outline" : undefined} size="small" color="green" onClick={toggleEditing}>Редактировать</Button>
      </div>
      <AdminTopbarMenu />
    </div>
  )
}

function AdminTopbarMenu() {
  return (
    <div className="admin-topbar__menu">
      <ButtonLink to="/admin/mailings">Рассылки</ButtonLink>
      <ButtonLink to="/admin/topics-tags">Тэги</ButtonLink>
      <ButtonLink to="/admin/mentors">Менторы</ButtonLink>
    </div>
  )
}


export default AdminTopbar
