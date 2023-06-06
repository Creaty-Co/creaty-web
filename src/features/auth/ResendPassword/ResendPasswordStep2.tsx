import { useResendPasswordMutation } from "@features/auth/auth.api"
import { PopupLayout } from "@shared/layout"
import { Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"

const CN = "form"
const MOD = "resend-password"
const { getElement, getModifier } = bem(CN)

interface IProps {
  email: string
}

export function ResendPasswordStep2({ email }: IProps) {
  const [api, contextHolder] = notification.useNotification()

  const [resendPassword, { error, reset }] = useResendPasswordMutation()

  useEffect(() => {
    if (!error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message })
    reset()
  }, [error])

  const handleResendPassword = () => resendPassword({ email })

  const elementContent = (
    <span className={cn(getElement("suggestion"))}>
      If you haven't received email in 5 minutes, check your spam or
      <em className={cn(getElement("redirection"))} onClick={handleResendPassword}>
        {" "}
        resend
      </em>
      .
    </span>
  )

  return (
    <PopupLayout title="Check you email for instructions to reset your password">
      <Formus className={cn(getModifier(CN, MOD))} elementContent={elementContent} onSubmit={handleResendPassword} />
      {contextHolder}
    </PopupLayout>
  )
}
