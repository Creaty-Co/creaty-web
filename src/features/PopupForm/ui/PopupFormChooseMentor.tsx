import { useAppSelector } from "@app/store"
import { Form, selectContactFormByType } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./PopupFormThanks"

const FORM_TYPE = "choose_mentor"

export function PopupFormChooseMentor() {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  */
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType(FORM_TYPE))

  const rForm = (
    <PopupLayout title={t(`forms.${FORM_TYPE}.title`)}>
      <Form type={FORM_TYPE} />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return <>{form.submitted ? rThanks : rForm}</>
}
