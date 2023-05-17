import { useAppSelector } from "@app/store"
import { ContactForm, selectContactFormByType } from "@features/contact-form"
import { VerifyForm } from "@features/verify-form"
import { PopupLayout } from "@shared/layout"

export interface IPopupFormBecomeMentor {
  className?: string
} 

export function PopupFormBecomeMentor() {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  */
  const form = useAppSelector(selectContactFormByType("become_mentor"))

  // const fieldEmail = form.fields.find(field => field.name === "email")

  const rForm = (
    <PopupLayout 
      title="Apply to be a mentor"
      width="35em"
    >
      <div className="pb-8 font--text-regular">
        <p className="text-violet">We are looking for people:</p>
        <ol style={{listStyle: "list-outside"}} className="text-black-1000 list-decimal list-outside pl-6 indent-3">
          <li>with more than 4 years of professional experience</li>
          <li>with time available for sessions with students</li>
        </ol>
      </div>
    
      <ContactForm type="become_mentor" />
    </PopupLayout>
  )

  const rThanks = (
    <PopupLayout 
      title="Verify your email"
      width="35em"
    >
      <VerifyForm email="yasha.petrunin@gmail.com"/>
    </PopupLayout>
  )

  return (
    <>
      { form.submitted? rThanks : rForm }
    </>
  )
}
