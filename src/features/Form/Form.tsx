import "./form.scss"

import { IForm, IFormFactory } from "./form.types"
import { FormChooseMentor, FormSignupMentor, FormStillQuestions, FormTestMeeting } from "./ui"

export const FormFactory: IFormFactory = {
  still_questions: FormStillQuestions,
  choose_mentor: FormChooseMentor,
  signup_mentor: FormSignupMentor,
  test_meeting: FormTestMeeting,
}

export function Form({ className, type }: IForm) {
  const Component = FormFactory[type]
  return <Component className={className} />
}
