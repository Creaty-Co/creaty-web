import "./ContactForm.scss"

import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"
import { FormType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { useSelector } from "react-redux"


interface ContactFormProps {
  submitText?: string
  type: FormType["type"]
}

function ContactForm(props: ContactFormProps) {
  const ll = useLocalization(ll => ll.components.contactForm)
  const form = useSelector(state => state.forms[props.type])
  // if (!form) throw new Error("ContactFormError: no form")
  return (
    <form className="contact-form">
      <div className="contact-form__inputs">
        {form?.fields.map((field, index) => (
          <Input placeholder={ll.fields[field].placeholder} required key={index} />
        ))}
        {/* <Input placeholder="Email" required />
        <Input placeholder="Номер или ник в " required masks={[]} /> */}
      </div>
      <Button className="contact-form__submit" size="big" type="submit" color="dark">{props.submitText || ll.submit}</Button>
      <div className="contact-form__terms">{ll.terms}</div>
    </form>
  )
}


export default ContactForm
