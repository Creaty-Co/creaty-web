import { FormType } from "interfaces/types"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import ContactForm from "../other/ContactForm/ContactForm"
import PopupLayout from "./PopupLayout"


interface PopupFormProps {
  type: Exclude<FormType["type"], "still_questions">
}

function PopupForm(props: PopupFormProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  const [submitted, setSubmitted] = useState(false)
  return (
    <PopupLayout title={submitted ? tPopup("thanks") : t("forms")[props.type].title} width="35em">
      <ContactForm type={props.type} onSubmit={() => setSubmitted(true)} />
    </PopupLayout>
  )
}

export default PopupForm
