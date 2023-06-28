import { EFormIds, TFormNames } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { FormGetHelp, FormTestMeeting } from "../ui"

interface IProps {
  formType: TFormNames
}

const getTranslationProp = (formType: TFormNames): string => {
  if (formType === EFormIds.GET_HELP) return "getHelp"
  if (formType === EFormIds.TEST_MEETING) return "testMeeting"
  return ""
  // if (formType === EFormIds.STILL_QUESTIONS) return "stillQuestions"
  // if (formType === EFormIds.SIGNUP_MENTOR) return "signup_mentor"
}

export function PopupFormWrapper({ formType }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms" })

  const getForm = () => {
    if (formType === EFormIds.GET_HELP) return <FormGetHelp />
    if (formType === EFormIds.TEST_MEETING) return <FormTestMeeting />
    // if (formType === EFormIds.STILL_QUESTIONS) return <FormStillQuestions />
    // if (formType === EFormIds.SIGNUP_MENTOR) return <FormSignupMentor />
  }

  return <PopupLayout title={t(`${getTranslationProp(formType)}.title`)}>{getForm()}</PopupLayout>
}
