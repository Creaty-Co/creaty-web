import { UserType } from "interfaces/user"
import { ReactNode } from "react"
import { DefaultRootState, useSelector } from "react-redux"


interface AdminInterfaceProps {
  children: ReactNode
}

function AdminInterface(props: AdminInterfaceProps) {
  const admin = useSelector<DefaultRootState, DefaultRootState["admin"]>(state => state.admin)
  const user = useSelector<DefaultRootState, DefaultRootState["user"]>(state => state.user)

  if (!admin.editing) return null
  if (!user.auth || user.type < UserType.admin) return null

  return <>{props.children}</>
}


export default AdminInterface
