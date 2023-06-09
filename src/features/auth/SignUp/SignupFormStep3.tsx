import { useAppDispatch, useAppSelector } from "@app/store"
import { selectAuthUsersData } from "@features/users/users.slice"
import { closeModal, PopupLayout } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import { notification } from "antd"
import { useEffect } from "react"

import { useResendVerifyEmailMutation } from "../auth.api"

const CN = "form"
const { getElement } = bem(CN)

export function SignupFormStep3() {
  const dispatch = useAppDispatch()
  const email = useAppSelector(selectAuthUsersData).email
  const [api, contextHolder] = notification.useNotification()

  const [resendVerifyEmail, { isSuccess, isLoading, error, reset }] = useResendVerifyEmailMutation()

  useEffect(() => {
    if (!error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message, duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (isSuccess) api.success({ message: "We've sent the confirmation to email again" })
  }, [isSuccess])

  const closeMpdal = () => dispatch(closeModal())
  const handleResendEmailVerify = () => resendVerifyEmail({ email: email || "doroshenkoradware@gmail.com" })

  return (
    <PopupLayout title="Check your email">
      <div className="form">
        <div className={getElement("confirmation")}>
          We've sent you a confirmation to <b>{email}</b>
        </div>
        <div className="grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4 w-full mt-6 mb-6">
          <Button size="biggest" color="dark" onClick={closeMpdal} pending={isLoading}>
            Ok
          </Button>
        </div>

        <span className={getElement("suggestion")}>
          <span>If you haven't received email in 5 minutes, check your spam or </span>
          <em className={getElement("redirection")} onClick={handleResendEmailVerify}>
            {` resend`}
          </em>
        </span>
      </div>
      {contextHolder}
    </PopupLayout>
  )
}
