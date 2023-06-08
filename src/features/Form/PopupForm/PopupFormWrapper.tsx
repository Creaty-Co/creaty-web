import { FormTypes } from "@features/Form"
import { PopupLayout } from "@shared/layout"
import { useTranslation } from "react-i18next"

import { FormGetHelp, FormSignupMentor, FormStillQuestions, FormTestMeeting } from "../ui"

interface IProps {
  formType: FormTypes
}

export function PopupFormWrapper({ formType }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other" })

  const getForm = () => {
    if (formType === "still_questions") return <FormStillQuestions />
    if (formType === "choose_mentor") return <FormGetHelp />
    if (formType === "signup_mentor") return <FormSignupMentor />
    if (formType === "test_meeting") return <FormTestMeeting />
  }

  return <PopupLayout title={t(`forms.${formType}.title`)}>{getForm()}</PopupLayout>
}
