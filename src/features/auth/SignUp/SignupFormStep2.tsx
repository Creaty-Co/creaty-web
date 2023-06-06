import { useAppDispatch, useAppSelector } from "@app/store"
import { useSignUpEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { selectAuthUsersData, signUpStep2 } from "@features/users/users.slice"
import { ISignUpFormStep2 } from "@features/users/users.types"
import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import { open, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { setTokens } from "../auth.slice"
import { LoginForm } from "../Login/LoginForm"
import { SignupFormStep3 } from "./SignupFormStep3"

export const schema = yup
  .object()
  .shape({
    first_name: yup.string().required("First name is required"),
  })
  .required()

const CN = "form"
const MOD = "signup"
const { getModifier } = bem(CN)

export function SignupFormStep2() {
  const dispatch = useAppDispatch()
  const authData = useAppSelector(selectAuthUsersData)
  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [signUpEmail, { data, error, isLoading, reset }] = useSignUpEmailMutation()

  const openLoginModal = () => dispatch(open(<LoginForm />))

  useEffect(() => {
    if (!error || ("status" in error && error?.status !== 409)) return
    api.error({
      message: `There is already registered user with this data`,
      duration: 10,
      btn: (
        <Button className="button button--dark button--little button__text" onClick={openLoginModal}>
          Login
        </Button>
      ),
    })
    reset()
  }, [error])

  useEffect(() => {
    if (!data) return
    dispatch(open(<SignupFormStep3 />))
    dispatch(setTokens({ accessToken: data.access, refreshToken: data.refresh }))
    getMe(skipToken)
  }, [data])

  const handleSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    const data: ISignUpFormStep2 = { first_name: values.first_name, last_name: values.last_name }
    dispatch(signUpStep2(data))
    signUpEmail({ ...authData, ...data })
  }

  const elementContent = (
    <>
      <Field type="input" name="first_name" label="First name*" />
      <Field type="input" name="last_name" label="Last name" />
    </>
  )

  const elementControl = (
    <Button
      className="button button--dark button--biggest button__text"
      type="primary"
      htmlType="submit"
      loading={isLoading}
    >
      Continue
    </Button>
  )

  return (
    <PopupLayout title="Almost done" subTitle="To start, what's your name?">
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={schema}
        onSubmit={handleSubmit}
      />
      {contextHolder}
    </PopupLayout>
  )
}
