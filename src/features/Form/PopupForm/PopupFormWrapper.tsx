import { EFormIds, TFormNames } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { FormGetHelp, FormSignupMentor, FormStillQuestions, FormTestMeeting } from "../ui"

interface IProps {
  formType: TFormNames
}

const getTranslationProp = (formType: TFormNames): string => {
  if (formType === EFormIds.STILL_QUESTIONS) return "still_questions"
  if (formType === EFormIds.GET_HELP) return "choose_mentor"
  if (formType === EFormIds.SIGNUP_MENTOR) return "signup_mentor"
  if (formType === EFormIds.TEST_MEETING) return "test_meeting"
  return ""
}

export function PopupFormWrapper({ formType }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other" })

  const getForm = () => {
    if (formType === EFormIds.STILL_QUESTIONS) return <FormStillQuestions />
    if (formType === EFormIds.GET_HELP) return <FormGetHelp />
    if (formType === EFormIds.SIGNUP_MENTOR) return <FormSignupMentor />
    if (formType === EFormIds.TEST_MEETING) return <FormTestMeeting />
  }

  return <PopupLayout title={t(`forms.${getTranslationProp(formType)}.title`)}>{getForm()}</PopupLayout>
}
