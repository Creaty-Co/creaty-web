import { useAppDispatch } from "@app/store"
import { Home } from "@pages/home"
import { open } from "@shared/layout"
import { useEffect } from "react"
import { useParams } from "react-router"

import { ResetPasswordForm } from "./ResetPasswordForm"

export function ResetPassword() {
  const dispatch = useAppDispatch()
  const params = useParams<"code">()

  useEffect(() => {
    if (params?.code) dispatch(open(<ResetPasswordForm code={+params.code} />))
  }, [])

  return <Home />
}
