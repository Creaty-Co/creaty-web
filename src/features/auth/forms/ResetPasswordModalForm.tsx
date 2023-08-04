import { history } from "@app/App"
import { useAppDispatch } from "@app/store"
import { useLazyGetMeQuery, useResetPasswordMutation } from "@features/auth/auth.api"
import { useQuery } from "@shared/index"
import { PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, Modal, notification } from "antd"
import cn from "classnames"
import { memo, useEffect } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import * as yup from "yup"

import { OuterLink } from "../../../shared/ui/OuterLink/OuterLink"
import { setTokens } from "../auth.slice"

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .test("passwordsMatch", "Passwords must match", function (value) {
        return this.parent.password === value
      })
      .test("upperLowerCase", "UPPERCASE & lowercase letters", function (value) {
        return /[A-Z]/.test(value ?? "") && /[a-z]/.test(value ?? "")
      })
      .test("containNumber", "contain at least 1 number", function (value) {
        return /\d/.test(value ?? "")
      })
      .min(8, "Please enter a password more than 8 character")
      .required("Password is required"),
    password2: yup
      .string()
      .test("passwordsMatch", "Passwords must match", function (value) {
        return this.parent.password === value
      })
      .test("upperLowerCase", "UPPERCASE & lowercase letters", function (value) {
        return /[A-Z]/.test(value ?? "") && /[a-z]/.test(value ?? "")
      })
      .test("containNumber", "contain at least 1 number", function (value) {
        return /\d/.test(value ?? "")
      })
      .min(8, "Please enter a password more than 8 character")
      .required("Repeat the password is required"),
  })
  .required()

const CN = "form"
const MOD = "reset-password"
const { getElement, getModifier } = bem(CN)

interface IProps {
  code?: string
}

export const ResetPasswordModalForm = memo(function ResetPasswordModalForm({ code }: IProps) {
  const query = useQuery()
  const first_name = query.get("first_name")
  const { t } = useTranslation("translation", {
    keyPrefix: `other.forms.${first_name ? "resetPasswordMentor" : "resetPassword"}`,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [resetPassword, { isLoading, error, reset, data, isSuccess, isError }] = useResetPasswordMutation()

  const closeModal = () => navigate("/")

  useEffect(() => {
    if (!isError && !error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message, duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (!isSuccess || !data) return
    // api.success({ message: t("successMessage"), duration: 10 })
    const { access, refresh } = data
    dispatch(setTokens({ accessToken: access, refreshToken: refresh }))
    getMe("")
    first_name ? navigate("/reset-password-mentor-success") : closeModal()
  }, [data])

  const handleResetPassword = (values: FieldValues) => resetPassword({ code, new_password: values.password })
  const handleGoogleClick = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)

  const elementContent = (
    <>
      <Field
        type="password"
        name="password"
        label="Password 8+ characters*"
        hints={{
          min: "8 characters long (minimum)",
          passwordsMatch: "Passwords must match",
          upperLowerCase: "UPPERCASE & lowercase letters",
          containNumber: "contain at least 1 number",
        }}
      />
      <Field
        type="password"
        name="password2"
        label="Repeat the password*"
        hints={{
          min: "8 characters long (minimum)",
          passwordsMatch: "Passwords must match",
          upperLowerCase: "UPPERCASE & lowercase letters",
          containNumber: "contain at least 1 number",
        }}
      />
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
        {t("submitText")}
      </Button>
      {first_name && (
        <>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <Button className="button button--google button--biggest button__text" onClick={handleGoogleClick}>
            {t("googleButtonText")}
          </Button>

          <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
            {t("terms")}
            <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
            <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
          </div>
        </>
      )}
    </>
  )

  return (
    <Modal open={!!code} onCancel={closeModal} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <PopupLayout
        hideCross
        title={
          <h3 className="font--h3-bold popup-layout__title mb-6 whitespace-pre-line	">{t("title", { first_name })}</h3>
        }
      >
        <Formus
          className={cn(getModifier(CN, MOD))}
          elementContent={elementContent}
          elementControl={elementControl}
          schema={schema}
          onSubmit={handleResetPassword}
        />
      </PopupLayout>
      {contextHolder}
    </Modal>
  )
})
