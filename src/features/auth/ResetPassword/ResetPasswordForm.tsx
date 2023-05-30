import { useAppDispatch } from "@app/store"
import { useResetPasswordMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import { close, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

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
const { getModifier } = bem(CN)

interface IProps {
  code: number
}

export function ResetPasswordForm({ code }: IProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [resetPassword, { isLoading, error, reset, data }] = useResetPasswordMutation()

  useEffect(() => {
    if (!error) return
    const message = (error as any)?.data?.error?.detail?.message || (error as any)?.data?.error?.detail
    api.warning({ message, placement: "topRight", duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (!data) return
    const { access, refresh } = data
    dispatch(setTokens({ accessToken: access, refreshToken: refresh }))
    getMe(skipToken)
    dispatch(close())
    navigate("/")
    api.success({ message: "Password successfully changed", placement: "topRight", duration: 10 })
  }, [data])

  const handleResetPassword = (values: FieldValues) => resetPassword({ code, password: values.password })

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
    <Button
      className="button button--dark button--biggest button__text"
      type="primary"
      htmlType="submit"
      loading={isLoading}>
      Continue
    </Button>
  )

  return (
    <PopupLayout title="Reset your password" width="35em">
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
