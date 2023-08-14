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
}

export function PopupFormWrapper({ formType }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms" })

  const getForm = () => {
    if (formType === EFormIds.GET_HELP) return <FormGetHelp />
    if (formType === EFormIds.TEST_MEETING) return <FormTestMeeting />
  }

  return <PopupLayout title={t(`${getTranslationProp(formType)}.title`)}>{getForm()}</PopupLayout>
}
