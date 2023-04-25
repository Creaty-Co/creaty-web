
import { AuthFormTypes } from "@features/auth/auth.types"
import { ContactFormTypes } from "@features/contact-form"

import {
  IPopupFormBecomeMentor,
  IPopupFormChooseMentor,
  IPopupFormTestMeeting,
  PopupFormBecomeMentor,
  PopupFormChooseMentor,
  PopupFormSignIn,
  PopupFormSignUp,
  PopupFormTestMeeting} from "./ui"

export interface IPopupForm {
  type: ContactFormTypes | AuthFormTypes
  className?: string
}

export type IPopupFormComponent = IPopupFormTestMeeting | IPopupFormBecomeMentor | IPopupFormChooseMentor
// export type IPopupFormComponent = IPopupFormBecomeMentor | IPopupFormChooseMentor | IPopupFormSignupMentor | IPopupFormStillQuestions | IPopupFormTestMeeting
export interface IPopupFormFactory extends Record<ContactFormTypes | AuthFormTypes, React.FC<IPopupFormComponent>> {}

export const PopupFormFactory: IPopupFormFactory = {
  "still_questions": PopupFormTestMeeting,
  "become_mentor": PopupFormBecomeMentor,
  "choose_mentor": PopupFormChooseMentor,
  "signup_mentor": PopupFormTestMeeting,
  "test_meeting": PopupFormTestMeeting,
  "sign-in": PopupFormSignIn,
  "sign-up": PopupFormSignUp,
  
}

export function PopupForm({
  className,
  type
}: IPopupForm) {
  const Component = PopupFormFactory[type]
  return <Component className={className} />
}
