
import { ContactFormTypes } from "@features/contact-form"

import {
  IPopupFormBecomeMentor,
  IPopupFormTestMeeting,
  PopupFormBecomeMentor,
  PopupFormTestMeeting
} from "./ui"

export interface IPopupForm {
  type: ContactFormTypes
  className?: string
}

export type IPopupFormComponent = IPopupFormTestMeeting | IPopupFormBecomeMentor
// export type IPopupFormComponent = IPopupFormBecomeMentor | IPopupFormChooseMentor | IPopupFormSignupMentor | IPopupFormStillQuestions | IPopupFormTestMeeting
export interface IPopupFormFactory extends Record<ContactFormTypes, React.FC<IPopupFormComponent>> {}

export const PopupFormFactory: IPopupFormFactory = {
  "still_questions": PopupFormTestMeeting,
  "become_mentor": PopupFormBecomeMentor,
  "choose_mentor": PopupFormTestMeeting,
  "signup_mentor": PopupFormTestMeeting,
  "test_meeting": PopupFormTestMeeting,
  
}

export function PopupForm({
  className,
  type
}: IPopupForm) {
  const Component = PopupFormFactory[type]
  return <Component className={className} />
}
