import { FormType } from "interfaces/types"
import useLocalization from "modules/localization/hook"

import ContactForm from "../other/ContactForm/ContactForm"
import PopupLayout from "./PopupLayout"


interface PopupFormProps {
  type: FormType["type"]
}

function PopupForm(props: PopupFormProps) {
  const forms = useLocalization(ll => ll.popups.popupForm)
  const ll = forms[props.type]
  return (
    <PopupLayout title={ll.title} width="35em">
      <ContactForm type={props.type} />
    </PopupLayout>
  )
}

export default PopupForm
