import { useAppSelector } from "@app/store"
import { ContactForm, selectContactFormByType } from "@features/contact-form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./popup-form.thanks"

export interface IPopupFormTestMeeting {
  className?: string
} 

export function PopupFormTestMeeting({
  className
}: IPopupFormTestMeeting) {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  */
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType("test_meeting"))

  const rForm = (
    <PopupLayout 
      title={t(`forms.test_meeting.title`)} 
      width="35em"
    >
      <ContactForm type="test_meeting" />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />

  return (
    <>
      { form.submitted? rThanks : rForm }
    </>
  )
}
