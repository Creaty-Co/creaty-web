import { FormTypes } from "@features/Form"

import { PopupFormBecomeMentor, PopupFormTestMeeting } from "./index"

export interface IPopupFormComponent {
  className?: string
}

export interface IPopupForm {
  type: FormTypes | string
  className?: string
}

export interface IPopupFormFactory extends Record<FormTypes | string, React.FC<IPopupFormComponent>> {}

export const PopupFormFactory: IPopupFormFactory = {
  still_questions: PopupFormTestMeeting,
  become_mentor: PopupFormBecomeMentor,
  choose_mentor: PopupFormTestMeeting,
  signup_mentor: PopupFormTestMeeting,
  test_meeting: PopupFormTestMeeting,
}

export function PopupForm({ className, type }: IPopupForm) {
  const Component = PopupFormFactory[type]
  return <Component className={className} />
}
