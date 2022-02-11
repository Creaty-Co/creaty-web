import { postAccountToken } from "api/actions/account"
import ClientAPI from "api/client"
import { UserType } from "interfaces/user"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { updateUser } from "redux/reducers/user"


function useDirectLogin() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const adminAccess = searchParams.get("adminAccess")
    if (adminAccess == null) return
    // setSearchParams("")

    const [login, password] = adminAccess.split(":")
    ClientAPI
      .query(postAccountToken(login, password))
      .then(({ error, payload }) => {
        if (error || !payload) return

        localStorage.setItem("token", payload.token)
        dispatch(updateUser({
          auth: true,
          type: UserType.admin
        }))
      })
  }, [searchParams])
}


export default useDirectLogin
