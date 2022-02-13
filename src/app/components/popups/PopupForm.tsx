import { FormType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { useState } from "react"

import ContactForm from "../other/ContactForm/ContactForm"
import PopupLayout from "./PopupLayout"


interface PopupFormProps {
  type: FormType["type"]
}

function PopupForm(props: PopupFormProps) {
  const ll = useLocalization(ll => ll.other)
  const popupLL = useLocalization(ll => ll.popups.popupForm)
  const [submitted, setSubmitted] = useState(false)
  return (
    <PopupLayout title={submitted ? popupLL.thanks : ll.forms[props.type].title} width="35em">
      <ContactForm type={props.type} onSubmit={() => setSubmitted(true)} />
    </PopupLayout>
  )
}

export default PopupForm
