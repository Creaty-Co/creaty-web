import "./admin.scss"

import { UserType } from "interfaces/user"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { updateAdminEditing } from "redux/reducers/admin"

import Button from "../common/Button/Button"
import ButtonLink from "../common/Button/ButtonLink"


// const editableViews = {
//   "/mentors": {
//     edit: "персональн"
//   }
// }


function AdminTopbar() {
  const dispatch = useDispatch()

  const admin = useSelector(state => state.admin)
  const user = useSelector(state => state.user)
  if (!user.auth || user.type < UserType.admin) return null

  const toggleEditing = () => dispatch(updateAdminEditing(!admin.editing))
  return (
    <div className="admin-topbar">
      <div className="admin-topbar__edit">
        <Button style={admin.editing ? "outline" : undefined} size="small" color="green" onClick={toggleEditing}>Редактировать</Button>
      </div>

    </div>
  )
}

function AdminTopbarMenu() {
  return (
    <div className="admin-topbar__menu">
      <ButtonLink to="/">фыв</ButtonLink>
      <ButtonLink to="/">фыв</ButtonLink>
      <ButtonLink to="/">фыв</ButtonLink>
    </div>
  )
}


export default AdminTopbar
