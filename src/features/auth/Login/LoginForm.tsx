import { history } from "@app/App"
import { useAppDispatch } from "@app/store"
import { useLoginEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import { closeModal, openModal, PopupLayout } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

import { setTokens } from "../auth.slice"
import { ResendPasswordStep1 } from "../ResendPassword/ResendPasswordStep1"
import { SignupFormStep1 } from "../SignUp/SignupFormStep1"

export const schema = yup
  .object()
  .shape({
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

const CN = "form"
const MOD = "login"
const { getElement, getModifier } = bem(CN)

export function LoginForm() {
  const dispatch = useAppDispatch()

  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [loginEmail, { data, isLoading, error, reset, isSuccess }] = useLoginEmailMutation()

  useEffect(() => {
    if (!error) return
    const message =
      (error as any)?.data?.detail ||
      (error as any)?.data?.error?.detail?.message ||
      (error as any)?.data?.error?.detail
    api.error({ message, duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (!isSuccess) return
    dispatch(closeModal())
    dispatch(setTokens({ accessToken: data.access, refreshToken: data.refresh }))
    getMe(skipToken)
  }, [data])

  const handleGoogleLogin = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)
  const handleEmailLogin = (values: FieldValues) => loginEmail({ email: values.email, password: values.password })
  const handleSignUpRedirect = () => dispatch(openModal(<SignupFormStep1 />))
  const handleForgotPasswordRedirect = () => dispatch(openModal(<ResendPasswordStep1 />))

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
        loading={isLoading}
      >
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
        By clicking on the Login, you agree to Creaty Co. <br />
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <PopupLayout title="Login">
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
