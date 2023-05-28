import { useAppDispatch } from "@app/store"
import { useResendPasswordMutation } from "@features/auth/auth.api"
import { open, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

import { LoginForm } from "../Login/LoginForm"
import { SignupFormStep1 } from "../SignUp/SignupFormStep1"

export const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required"),
  })
  .required()

const CN = "form"
const MOD = "resend-password"
const { getElement, getModifier } = bem(CN)

export function ResendPassword() {
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification()

  const [resendPassword, { isLoading, error, reset }] = useResendPasswordMutation()

  useEffect(() => {
    if (!error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message, placement: "topRight", duration: 10 })
    reset()
  }, [error])

  const handleResetPassword = (values: FieldValues) => resendPassword({ email: values.email })
  const handleLoginRedirect = () => dispatch(open(<LoginForm />))
  const handleSignUpRedirect = () => dispatch(open(<SignupFormStep1 />))

  const elementContent = (
    <>
      <span className={cn(getElement("suggestion"))}>
        Enter the email address associated with your account and we'll send you a link to reset your password.{" "}
      </span>
      <Field type="input" name="email" label="Email address*" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}>
        Continue
      </Button>

      <span className={cn(getElement("suggestion"))}>
        <span>Return to </span>
        <em className={cn(getElement("redirection"))} onClick={handleLoginRedirect}>
          Log in{" "}
        </em>
        <span>, or if you don't have an account, </span>

        <em className={cn(getElement("redirection"))} onClick={handleSignUpRedirect}>
          Sign up
        </em>
      </span>
    </>
  )

  return (
    <PopupLayout title="Resend your password" width="35em">
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={schema}
        onSubmit={handleResetPassword}
      />
      {contextHolder}
    </PopupLayout>
  )
}
