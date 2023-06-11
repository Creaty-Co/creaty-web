import { useAppDispatch } from "@app/store"
import { EFormIds } from "@features"
import { openModal } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { PopupFormThanks } from "../PopupForm"
import { usePostFormsIdApplicationsMutation } from "../state/form.api"

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required("Full Name"),
    email: yup
      .string()
      .test("email", function (value) {
        const { path, createError } = this
        return (value && isEmail(value)) || createError({ path, message: "invalid email" })
      })
      .required("Email"),
  })
  .required()

const hintsEmail = {
  email: "Should be like@this.com",
}

const CN = "formus"
const MOD = "still-quetion"
const { getElement, getModifier } = bem(CN)

interface IProps {
  handleSubmit?(): void
}

export function FormStillQuestions({ handleSubmit }: IProps) {
  const dispatch = useAppDispatch()
  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      formName: EFormIds.STILL_QUESTIONS,
      path: document.location.pathname,
      values,
    })
  }
  useEffect(() => {
    if (isSuccess) handleSubmit ? handleSubmit() : dispatch(openModal(<PopupFormThanks />))
  }, [isSuccess])

  const elementContent = (
    <>
      <Field disabled={isLoading} type="input" name="fullname" label="Full name" />
      <Field disabled={isLoading} hints={hintsEmail} type="input" name="email" label="Email" />
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
        Get Help
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By on the Get Help, you agree to Creaty Co. <br />
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
