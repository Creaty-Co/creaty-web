import { UserType } from "interfaces/user"
import { ReactNode } from "react"
import { useSelector } from "react-redux"


interface AdminInterfaceProps {
  children: ReactNode
}

function AdminInterface(props: AdminInterfaceProps) {
  const admin = useSelector(state => state.admin)
  const user = useSelector(state => state.user)

  if (!admin.editing) return null
  if (!user.auth || user.type < UserType.admin) return null

  return <>{props.children}</>
}


export default AdminInterface
