import { history } from "@app/App"
import { useAppDispatch } from "@app/store"
import { useLoginEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import { openModal, PopupLayout } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, Modal, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import * as yup from "yup"

import { setTokens } from "../auth.slice"
import { ResendPasswordStep1 } from "./ResendPassword/ResendPasswordStep1"

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

interface IProps {
  show: boolean
}

export function LoginModalForm({ show }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.login" })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [loginEmail, { data, isLoading, error, reset, isSuccess }] = useLoginEmailMutation()

  const closeModal = () => navigate("/")

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
    dispatch(setTokens({ accessToken: data.access, refreshToken: data.refresh }))
    getMe(skipToken)
    closeModal()
  }, [data])

  const handleGoogleLogin = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)
  const handleEmailLogin = (values: FieldValues) => loginEmail({ email: values.email, password: values.password })
  const handleSignUpRedirect = () => navigate("/sign-up")

  const handleForgotPasswordRedirect = () => {
    dispatch(openModal(<ResendPasswordStep1 />))
    closeModal()
  }

  const elementContent = (
    <>
      <span className={getElement("suggestion")}>
        {`${t("header")} `}
        <em className={getElement("redirection")} onClick={handleSignUpRedirect}>
          Sign Up
        </em>
      </span>
      <Field type="input" name="email" label="Email*" />
      <Field type="password" name="password" label="Password*" />

      <span className={cn(getElement("suggestion"))}>
        <em className={cn(getElement("redirection"))} onClick={handleForgotPasswordRedirect}>
          {t("password")}
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
        {t("mainButtonText")}
      </Button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <Button className="button button--google button--biggest button__text" onClick={handleGoogleLogin}>
        {t("googleButtonText")}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        {t("terms")}
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Modal open={show} onCancel={closeModal} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <PopupLayout
        onClose={closeModal}
        title={<h3 className={cn("font--h3-bold popup-layout__title", getElement("title"))}>{t("title")}</h3>}
      >
        <Formus
          className={cn(getModifier(CN, MOD))}
          elementContent={elementContent}
          elementControl={elementControl}
          schema={schema}
          onSubmit={handleEmailLogin}
        />
      </PopupLayout>
      {contextHolder}
    </Modal>
  )
}
