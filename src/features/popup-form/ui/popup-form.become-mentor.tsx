import { useAppSelector } from "@app/store"
import { ContactForm, selectContactFormByType } from "@features/contact-form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./popup-form.thanks"

export interface IPopupFormBecomeMentor {
  className?: string
} 

export function PopupFormBecomeMentor({
  className
}: IPopupFormBecomeMentor) {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  */
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType("become_mentor"))

  const rForm = (
    <PopupLayout 
      title={t(`forms.become_mentor.title`)} 
      width="35em"
    >
      <ContactForm type="become_mentor" />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return (
    <>
      { form.submitted? rThanks : rForm }
    </>
  )
}
