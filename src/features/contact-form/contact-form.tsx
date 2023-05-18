import "./contact-form.scss"

import { ContactFormType } from "./contact-form.types"
import {
  ContactFormBecomeMentor,
  ContactFormChooseMentor,
  ContactFormSignupMentor,
  ContactFormStillQuestions,
  ContactFormTestMeeting,
  IContactFormBecomeMentor,
  IContactFormChooseMentor, 
  IContactFormSignupMentor, 
  IContactFormStillQuestions, 
  IContactFormTestMeeting, 
} from "./ui"

export interface IContactForm {
  type: ContactFormType["type"]
  className?: string
}

export type IComponent = IContactFormBecomeMentor | IContactFormChooseMentor | IContactFormSignupMentor | IContactFormStillQuestions | IContactFormTestMeeting
export interface IContactFormFactory extends Record<ContactFormType["type"], React.FC<IComponent>> {}

export const ContactFormFactory: IContactFormFactory = {
  "still_questions": ContactFormStillQuestions,
  "become_mentor": ContactFormBecomeMentor,
  "choose_mentor": ContactFormChooseMentor,
  "signup_mentor": ContactFormSignupMentor,
  "test_meeting": ContactFormTestMeeting,
}

export function ContactForm({
  className,
  type
}: IContactForm) {
  const Component = ContactFormFactory[type]
  return <Component className={className} />
}
