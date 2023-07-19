import { useAppDispatch } from "@app/store"
import { useResendPasswordMutation } from "@features/auth/auth.api"
import { openModal, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import * as yup from "yup"

import { ResendPasswordStep2 } from "./ResendPasswordStep2"

export const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required"),
  })
  .required()

const CN = "form"
const MOD = "resend-password"
const { getElement, getModifier } = bem(CN)

export function ResendPasswordStep1() {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.resendPassword" })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [resendedEmail, setResendedEmail] = useState("")
  const [api, contextHolder] = notification.useNotification()

  const [resendPassword, { isLoading, error, reset, isSuccess }] = useResendPasswordMutation()

  useEffect(() => {
    if (!error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message, duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (isSuccess) dispatch(openModal(<ResendPasswordStep2 email={resendedEmail} />))
  }, [isSuccess])

  const handleResendPassword = (values: FieldValues) => {
    resendPassword({ email: values.email })
    setResendedEmail(values.email)
  }
  const handleLoginRedirect = () => navigate("/login")
  const handleSignUpRedirect = () => navigate("/sign-up")

  const elementContent = (
    <>
      <span className={cn(getElement("suggestion"))}>{t("header")}</span>
      <Field type="input" name="email" label="Email*" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        Continue
      </Button>

      <span className={cn(getElement("suggestion"))}>
        <em className={cn(getElement("redirection"))} onClick={handleLoginRedirect}>
          {t("return")}
        </em>
        <span>{t("return2")}</span>

        <em className={cn(getElement("redirection"))} onClick={handleSignUpRedirect}>
          {t("return3")}
        </em>
      </span>
    </>
  )

  return (
    <PopupLayout title={t("title")} hideCross>
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={schema}
        onSubmit={handleResendPassword}
      />
      {contextHolder}
    </PopupLayout>
  )
}
