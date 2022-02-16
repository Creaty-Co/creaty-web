import "./ContactForm.scss"

import { postFormsIdApplications } from "api/actions/form"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Input, { InputStrainType } from "app/components/UI/Input/Input"
import { FormElements } from "interfaces/common"
import { FormFieldType, FormType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { ChangeEvent, FormEvent, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"


interface ContactFormProps {
  type: FormType["type"]

  submitText?: string
  onSubmit?(): void
}

function ContactForm(props: ContactFormProps) {
  const ll = useLocalization(ll => ll.components.contactForm)
  const form = useSelector(state => state.forms[props.type])
  const [submitted, setSubmitted] = useState(false)
  const [socialStrain, setSocialStrain] = useState<InputStrainType<string>>()

  if (submitted) {
    return (
      <div className="contact-form">
        <p className="contact-form__text">{form?.post_send}</p>
      </div>
    )
  }

  function onPhoneOrNickChange(event: ChangeEvent<HTMLInputElement>, strain?: InputStrainType<FormFieldType["type"]>) {
    if (!strain) return
    setSocialStrain(strain)

    if (["whats_app", "viber"].includes(strain.value)) {
      const target = event.currentTarget
      const maskedValue = target.value.replace(/(?:(\d+))(\d{3})(\d{3})(\d{2})(\d{2})$/gm, "+$1 ($2) $3 $4-$5")

      target.value = maskedValue
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (form?.id == null) return

    const target = event.currentTarget
    const elements = target.elements as FormElements<FormFieldType["type"]>
    const inputValues = [...elements].reduce<Record<string, string>>((result, next) => {
      if (next instanceof HTMLInputElement || next instanceof HTMLTextAreaElement) {
        return { ...result, [next.name]: next.value }
      }
      return result
    }, {})

    ClientAPI
      .query(postFormsIdApplications(form.id, inputValues))
      .then(({ error }) => {
        if (error) return

        setSubmitted(true)
        props.onSubmit?.()
      })
  }

  const includesSocial = (field: FormFieldType) => ["telegram", "facebook", "whats_app", "viber"].includes(field.type)
  const name = form?.fields.find(field => field.type === "name")
  const email = form?.fields.find(field => field.type === "email")
  const social = form?.fields.find(includesSocial)
  const about = form?.fields.find(field => field.type === "about")
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {!!form?.description?.length && (
        <p className="contact-form__text">
          <ReactMarkdown>{form.description}</ReactMarkdown>
        </p>
      )}
      <div className="contact-form__inputs">
        {name && (
          <Input placeholder={name.placeholder} type="text" name="name" required />
        )}
        {email && (
          <Input placeholder={email.placeholder} type="email" name="email" required />
        )}
        {social && (
          <Input placeholder={social.placeholder} name={socialStrain?.value} required strains={form?.fields.filter(includesSocial).map(field => {
            return {
              title: ll.fields[field.type].title,
              value: field.type
            }
          })} onChange={onPhoneOrNickChange} />
        )}
        {about && (
          <div className="input">
            <textarea className="input__input" name="about" placeholder={about.placeholder}></textarea>
          </div>
        )}
      </div>
      <Button className="contact-form__submit" size="big" type="submit" color="dark" eventLabel="Contact Form">{props.submitText || ll.submit}</Button>
      <div className="contact-form__terms">{ll.terms}</div>
    </form>
  )
}


export default ContactForm
