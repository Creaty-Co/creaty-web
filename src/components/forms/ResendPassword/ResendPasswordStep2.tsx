import { Formus } from "@shared/ui/Formus/Formus"
import { PopupLayout } from "@shared/ui/PopupLayout/PopupLayout"
import { bem } from "@shared/utils/common"
import { notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useResendPasswordMutation } from "src/store/auth/auth.api"

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
    <PopupLayout title={t("title")} hideCross>
      <Formus className={cn(getModifier(CN, MOD))} elementContent={elementContent} onSubmit={handleResendPassword} />
      {contextHolder}
    </PopupLayout>
  )
}
