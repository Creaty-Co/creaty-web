import "./admin.scss"

import Button from "../common/Button/Button"
import ButtonLink from "../common/Button/ButtonLink"


function AdminTopbar() {

  return (
    <div className="admin-topbar">
      <div className="admin-topbar__edit">
        <Button>Редактировать</Button>
      </div>
      <div className="admin-topbar__menu">
        <ButtonLink to="/">фыв</ButtonLink>
      </div>
    </div>
  )
}


export default AdminTopbar
