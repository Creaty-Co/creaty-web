import { useAppSelector } from "@app/store"
import { Form, selectContactFormByType } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./PopupFormThanks"

const FORM_TYPE = "test_meeting"

export function PopupFormTestMeeting() {
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType(FORM_TYPE))

  const rForm = (
    <PopupLayout title={t(`forms.${FORM_TYPE}.title`)} width="35em">
      <Form type={FORM_TYPE} />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return <>{form.submitted ? rThanks : rForm}</>
}
