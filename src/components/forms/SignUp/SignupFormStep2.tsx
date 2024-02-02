import { Field } from "@shared/ui/field/field"
import { Formus } from "@shared/ui/Formus/Formus"
import { PopupLayout } from "@shared/ui/PopupLayout/PopupLayout"
import { bem } from "@shared/utils/common"
import { Button, notification } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { useLazyGetMeQuery, useSignUpEmailMutation } from "src/store/auth/auth.api"
import { authUserDataS, setTokens, signUpStep2 } from "src/store/auth/auth.slice"
import { ISignUpFormStep2 } from "src/store/auth/auth.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "src/store/store"
import * as yup from "yup"

import { SignupFormStep3 } from "./SignupFormStep3"

export const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required"),
  })
  .required()

const CN = "form"
const MOD = "signup"
const { getModifier } = bem(CN)

export function SignupFormStep2() {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.signUpStep2" })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authData = useAppSelector(authUserDataS)
  const [api, contextHolder] = notification.useNotification()

  const [getMe] = useLazyGetMeQuery()
  const [signUpEmail, { data, error, isLoading, reset }] = useSignUpEmailMutation()

  const openLoginModal = () => navigate("/login")

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
    dispatch(openModal(<SignupFormStep3 />))
    dispatch(setTokens({ accessToken: data.access, refreshToken: data.refresh }))
    getMe("")
  }, [data])

  const handleSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    const { firstName, lastName } = values as ISignUpFormStep2
    dispatch(signUpStep2({ firstName, lastName }))
    signUpEmail({ ...authData, first_name: firstName, last_name: lastName })
  }

  const elementContent = (
    <>
      <Field type="input" name="firstName" label="First name*" />
      <Field type="input" name="lastName" label="Last name" />
    </>
  )

  const elementControl = (
    <Button
      className="button button--dark button--biggest button__text"
      type="primary"
      htmlType="submit"
      loading={isLoading}
      id="signupπModalFormSubmitGoogleButton"
    >
      {t("submitText")}
    </Button>
  )

  return (
    <PopupLayout title={t("title")} subTitle={t("subTitle")} hideCross>
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
