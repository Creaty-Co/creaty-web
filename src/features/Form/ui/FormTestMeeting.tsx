import { useAppDispatch, useAppSelector } from "@app/store"
import { authUserDataS } from "@features/auth/auth.slice"
import { EFormIds, PopupFormThanks, usePostFormsIdApplicationsMutation } from "@features/Form"
import { openModal } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    about: yup.string(),
  })
  .required()

const CN = "form"
const MOD = "test-meeting"
const { getElement, getModifier } = bem(CN)

export function FormTestMeeting() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.testMeeting" })

  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()

  const { firstName, email } = useAppSelector(authUserDataS)

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      formName: EFormIds.TEST_MEETING,
      path: document.location.pathname,
      ...values,
    })
  }
  useEffect(() => {
    if (isSuccess) dispatch(openModal(<PopupFormThanks />))
  }, [isSuccess])

  const elementContent = (
    <>
      <Field type="input" name="name" label="Name*" defaultValue={firstName} />
      <Field type="input" name="email" label="Email*" defaultValue={email || undefined} />
      <Field type="textarea" name="about" label="How can a mentor help? (You can discuss this later)" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
        id="formTestMeeting"
      >
        {t("submitText")}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By on the {t("terms")}, you agree to Creaty Co. <br />
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Formus
      className={getModifier(CN, MOD)}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}
