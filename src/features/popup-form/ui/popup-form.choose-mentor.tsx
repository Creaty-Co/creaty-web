import { useAppSelector } from "@app/store"
import { ContactForm, selectContactFormByType } from "@features/contact-form"
import { PopupLayout } from "@shared/layout"
import cn from "classnames"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./popup-form.thanks"

export interface IPopupFormChooseMentor {
  className?: string
} 

const FORM_TYPE = "choose_mentor"

export function PopupFormChooseMentor({
  className
}: IPopupFormChooseMentor) {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  */
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const form = useAppSelector(selectContactFormByType(FORM_TYPE))

  const rForm = (
    <PopupLayout 
      title={t(`forms.${FORM_TYPE}.title`)} 
      width="35em"
    >
      <ContactForm className={cn(className, "pt-6")} type={FORM_TYPE} />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return (
    <>
      { form.submitted? rThanks : rForm }
    </>
  )
}
