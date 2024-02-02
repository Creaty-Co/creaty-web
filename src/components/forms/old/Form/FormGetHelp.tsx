import { Field } from "@shared/ui/field/field"
import { Formus } from "@shared/ui/Formus/Formus"
import { OuterLink } from "@shared/ui/OuterLink/OuterLink"
import { bem } from "@shared/utils/common"
import { authUserDataS } from "@store/auth/auth.slice"
import { usePostFormsIdApplicationsMutation } from "@store/forms/form.api"
import { EFormIds } from "@store/forms/form.types"
import { openModal } from "@store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "@store/store"
import { Button } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { authUserDataS } from "src/store/auth/auth.slice"
import { EFormIds } from "src/store/forms/form.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "src/store/store"
import * as yup from "yup"

import { PopupFormThanks } from "../PopupForm/PopupFormThanks"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
  })
  .required()

const CN = "form"
const MOD = "get-help"
const { getElement, getModifier } = bem(CN)

export function FormGetHelp() {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.getHelp" })
  const dispatch = useAppDispatch()
  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()

  const { firstName, email } = useAppSelector(authUserDataS)

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({ formName: EFormIds.GET_HELP, path: document.location.pathname, ...values })
  }

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      window.dataLayer.push({ event: `Get help to find a mentor form submit` })
      dispatch(openModal(<PopupFormThanks />))
    }
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
        id="formGetHelp"
      >
        <span className="flex flex-row gap-3">{t("submitText")}</span>
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
      className={getModifier(CN, MOD)}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}
