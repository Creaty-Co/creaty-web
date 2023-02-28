import "./admin.scss"

import { UserType } from "interfaces/user"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { updateAdminEditing } from "redux/reducers/admin"
import { updateUser } from "redux/reducers/user"

import Button from "../../../shared/ui/button/Button"
import ButtonLink from "../../../shared/ui/button/ButtonLink"


function AdminTopbar() {
  const dispatch = useDispatch()

  const admin = useSelector<DefaultRootState, DefaultRootState["admin"]>(state => state.admin)
  const user = useSelector<DefaultRootState, DefaultRootState["user"]>(state => state.user)
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
        <Button size="small" outline={admin.editing} color="green" onClick={toggleEditing}>Редактировать</Button>
      </div>
      <AdminTopbarMenu />
    </div>
  )
}

function AdminTopbarMenu() {
  const dispatch = useDispatch()
  function exit() {
    dispatch(updateUser({ auth: false }))
    localStorage.removeItem("token")
  }
  return (
    <div className="admin-topbar__menu">
      <ButtonLink size="small" nav to="/admin/forms">Формы</ButtonLink>
      <ButtonLink size="small" nav to="/admin/mailings">Рассылки</ButtonLink>
      <ButtonLink size="small" nav to="/admin/topics">Категории</ButtonLink>
      <ButtonLink size="small" nav to="/admin/tags">Тэги</ButtonLink>
      <ButtonLink size="small" nav to="/admin/mentors">Менторы</ButtonLink>
      <Button size="small" color="violet" onClick={exit}>Выйти</Button>
    </div>
  )
}


export default AdminTopbar
