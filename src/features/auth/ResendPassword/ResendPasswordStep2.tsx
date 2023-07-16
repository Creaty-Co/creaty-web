import { useResendPasswordMutation } from "@features/auth/auth.api"
import { PopupLayout } from "@shared/layout"
import { Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const CN = "form"
const MOD = "resend-password"
const { getElement, getModifier } = bem(CN)

interface IProps {
  email: string
}

export function ResendPasswordStep2({ email }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.resendPassword2" })
  const [api, contextHolder] = notification.useNotification()

  const [resendPassword, { error, reset }] = useResendPasswordMutation()

  useEffect(() => {
    if (!error) return
    const message =
      (error as any)?.data?.error?.detail?.email?.[0]?.message ||
      (error as any)?.data?.error?.detail?.message ||
      (error as any)?.data?.error?.detail
    api.warning({ message, duration: 10 })
    reset()
  }, [error])

  const handleResendPassword = () => resendPassword({ email })

  const elementContent = (
    <span className={cn(getElement("suggestion"))}>
      {t("subTitle")}
      <em className={cn(getElement("redirection"))} onClick={handleResendPassword}>
        {t("resend")}
      </em>
    </span>
  )

  return (
    <PopupLayout title={t("title")}>
      <Formus className={cn(getModifier(CN, MOD))} elementContent={elementContent} onSubmit={handleResendPassword} />
      {contextHolder}
    </PopupLayout>
  )
}
