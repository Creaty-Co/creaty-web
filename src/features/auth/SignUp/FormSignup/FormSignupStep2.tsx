import { useAppDispatch, useAppSelector } from "@app/store"
import { useSignUpEmailMutation } from "@features/auth/auth.api"
import { selectAuthData, setSignUpStep, signUpStep2 } from "@features/auth/auth.slice"
import { PopupLayout } from "@shared/layout"
import { setContent } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"

import { FormLogin } from "../../Login/FormLogin"
import { formSignupStep2Schema } from "./validationSchemas"

const CN = "form"
const MOD = "signup"
const { getModifier } = bem(CN)

export function FormSignupStep2() {
  const dispatch = useAppDispatch()
  const authData = useAppSelector(selectAuthData)
  const [api, contextHolder] = notification.useNotification()

  const [signUpEmail, { error, isLoading, reset }] = useSignUpEmailMutation()

  const openLoginModal = () => {
    dispatch(setSignUpStep(null))
    dispatch(setContent(<FormLogin />))
    api.destroy()
  }

  useEffect(() => {
    if (!error || ("status" in error && error?.status !== 409)) return
    api.error({
      message: `There is already registered user with this data`,
      placement: "topRight",
      duration: 10,
      btn: (
        <Button className="button button--dark button--little button__text" onClick={openLoginModal}>
          Login
        </Button>
      ),
    })
    reset()
  }, [error])

  const handleSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    const data = { first_name: values.first_name, last_name: values.last_name }
    dispatch(signUpStep2(data))
    signUpEmail({ ...authData, ...data })
  }

  const elementContent = (
    <>
      <Field type="input" name="first_name" label="First name*" />
      <Field type="input" name="last_name" label="Last name*" />
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
    <PopupLayout title="Almost done" subTitle="To start, what's your name?" width="35em">
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={formSignupStep2Schema}
        onSubmit={handleSubmit}
      />
      {contextHolder}
    </PopupLayout>
  )
}
