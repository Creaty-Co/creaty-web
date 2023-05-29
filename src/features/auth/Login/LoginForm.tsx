import { history } from "@app/App"
import { useAppDispatch } from "@app/store"
import { useLoginEmailMutation } from "@features/auth/auth.api"
import { open, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

import { ResendPassword } from "../ResetPassword/ResendPassword"
import { SignupFormStep1 } from "../SignUp/SignupFormStep1"

export const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

const CN = "form"
const MOD = "login"
const { getElement, getModifier } = bem(CN)

export function LoginForm() {
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification()

  const [loginEmail, { isLoading, error, reset }] = useLoginEmailMutation()

  useEffect(() => {
    if (!error) return
    api.error({
      message: "data" in error && (error.data as { detail: string }).detail,
      placement: "topRight",
      duration: 10,
    })
    reset()
  }, [error])

  const handleGoogleLogin = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)
  const handleEmailLogin = (values: FieldValues) => loginEmail({ email: values.email, password: values.password })
  const handleSignUpRedirect = () => dispatch(open(<SignupFormStep1 />))
  const handleForgotPasswordRedirect = () => dispatch(open(<ResendPassword />))

  const elementContent = (
    <>
      <span className={cn(getElement("suggestion"))}>
        Don't you have an account?{" "}
        <em className={cn(getElement("redirection"))} onClick={handleSignUpRedirect}>
          Sign Up
        </em>
      </span>
      <Field type="input" name="email" label="Email address*" />
      <Field type="password" name="password" label="Password*" />

      <span className={cn(getElement("suggestion"))}>
        <em className={cn(getElement("redirection"))} onClick={handleForgotPasswordRedirect}>
          Forgot your password?
        </em>
      </span>
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}>
        Login
      </Button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <Button className="button button--google button--biggest button__text" onClick={handleGoogleLogin}>
        Continue with Google
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
      </div>
    </>
  )

  return (
    <PopupLayout title="Login" width="35em">
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={schema}
        onSubmit={handleEmailLogin}
      />
      {contextHolder}
    </PopupLayout>
  )
}
