import { useAppSelector } from "@app/store"
import { EFormIds } from "@features"
import { authUserDataS } from "@features/auth/auth.slice"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

import { usePostFormsIdApplicationsMutation } from "../state/form.api"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .test("email", function (value) {
        const { path, createError } = this
        return (value && isEmail(value)) || createError({ path, message: "invalid email" })
      })
      .required("Email is required"),
  })
  .required()

const hintsEmail = {
  email: "Should be like@this.com",
}

const CN = "formus"
const MOD = "still-quetion"
const { getElement, getModifier } = bem(CN)

interface IProps {
  handleSubmit(): void
}

export function FormStillQuestions({ handleSubmit }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.stillQuestions" })
  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()

  const { firstName, email } = useAppSelector(authUserDataS)

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      formName: EFormIds.STILL_QUESTIONS,
      path: document.location.pathname,
      ...values,
    })
  }
  useEffect(() => {
    if (isSuccess) handleSubmit()
  }, [isSuccess])

  const elementContent = (
    <>
      <Field disabled={isLoading} type="input" name="name" label="Name*" defaultValue={firstName} />
      <Field
        disabled={isLoading}
        hints={hintsEmail}
        type="input"
        name="email"
        label="Email*"
        defaultValue={email || undefined}
      />
      <Field disabled={isLoading} type={"input"} name="about" label="How can we help?*" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
        id="formStillQuestions"
      >
        {t("submitText")}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        {t("terms")}
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Formus
      className={cn(getModifier(CN, MOD), "form")}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}
