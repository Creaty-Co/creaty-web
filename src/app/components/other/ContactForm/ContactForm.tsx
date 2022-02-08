import "./ContactForm.scss"

import Button from "app/components/common/Button/Button"
import Input, { InputStrainType } from "app/components/UI/Input/Input"
import { FormFieldType, FormType } from "interfaces/types"
import _ from "lodash"
import useLocalization from "modules/localization/hook"
import { ChangeEvent } from "react"
import { useSelector } from "react-redux"


interface ContactFormProps {
  submitText?: string
  type: FormType["type"]
}

function ContactForm(props: ContactFormProps) {
  const ll = useLocalization(ll => ll.components.contactForm)
  const form = useSelector(state => state.forms[props.type])
  function onPhoneOrNickChange(event: ChangeEvent<HTMLInputElement>, strain?: InputStrainType<string>) {
    if (!strain) return
    if (["whats_app", "viber"].includes(strain.value)) {
      const target = event.currentTarget
      const maskedValue = target.value.replace(/(?:(\d+))(\d{3}?)(\d{3}?)(\d{2}?)(\d{2})$/gm, "+$1 ($2) $3 $4-$5")

      target.value = maskedValue
    }
  }

  const includesSocial = (field: FormFieldType) => ["telegram", "facebook", "whats_app", "viber"].includes(field.type)

  const name = form?.fields.find(field => field.type === "name")
  const email = form?.fields.find(field => field.type === "email")
  const social = form?.fields.find(includesSocial)
  const about = form?.fields.find(field => field.type === "about")
  return (
    <form className="contact-form">
      <div className="contact-form__inputs">
        {name && (
          <Input placeholder={name.placeholder} type="text" required />
        )}
        {email && (
          <Input placeholder={email.placeholder} type="email" required />
        )}
        {social && (
          <Input placeholder={social.placeholder} required strains={form?.fields.filter(includesSocial).map(field => {
            return {
              title: ll.fields[field.type].title,
              value: field.type
            }
          })} onChange={onPhoneOrNickChange} />
        )}
        {about && (
          <textarea placeholder={about.placeholder}></textarea>
        )}
      </div>
      <Button className="contact-form__submit" size="big" type="submit" color="dark">{props.submitText || ll.submit}</Button>
      <div className="contact-form__terms">{ll.terms}</div>
    </form>
  )
}


export default ContactForm
