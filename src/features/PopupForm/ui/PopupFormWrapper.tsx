import { useAppSelector } from "@app/store"
import { Form, FormTypes, selectContactFormByType } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./PopupFormThanks"

interface IProps {
  formType: FormTypes
}

export function PopupFormWrapper({ formType }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType(formType))

  const rForm = (
    <PopupLayout title={t(`forms.${formType}.title`)}>
      <Form type={formType} />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return <>{form.submitted ? rThanks : rForm}</>
}
