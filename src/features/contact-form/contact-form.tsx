import "./contact-form.scss"

import { ContactFormType } from "./contact-form.types"
import {
  ContactFormBecomeMentor,
  ContactFormChooseMentor,
  ContactFormSignupMentor,
  ContactFormStillQuestions,
  ContactFormTestMeeting,
  IContactFormBecomeMentor,
  IContactFormChooseMentor, 
  IContactFormSignupMentor, 
  IContactFormStillQuestions, 
  IContactFormTestMeeting, 
} from "./ui"

export interface IContactForm {
  type: ContactFormType["type"]
  className?: string
}

export type IComponent = IContactFormBecomeMentor | IContactFormChooseMentor | IContactFormSignupMentor | IContactFormStillQuestions | IContactFormTestMeeting
export interface IContactFormFactory extends Record<ContactFormType["type"], React.FC<IComponent>> {}

export const ContactFormFactory: IContactFormFactory = {
  "still_questions": ContactFormStillQuestions,
  "become_mentor": ContactFormBecomeMentor,
  "choose_mentor": ContactFormChooseMentor,
  "signup_mentor": ContactFormSignupMentor,
  "test_meeting": ContactFormTestMeeting,
}

export function ContactForm({
  className,
  type
}: IContactForm) {
  const Component = ContactFormFactory[type]
  return <Component className={className} />
}

/* const { t } = useTranslation("translation", { keyPrefix: "components.contactForm" }) */
/* const form = useAppSelector(selectContactFormByType(type)) */
/* const [submitted, setSubmitted] = useState(false) */
/* const { data, isLoading } = useGetPagesLinksDocumentsQuery() */ 
/*
  const links = isLoading || !data ? {}
    : data.results.reduce<
      Record<PageLinkType["type"], PageLinkType>
    >((result, next) => ({...result, [next.type]: next }), {} as never)

  const [postFormsIdApplications, { isLoading: isUpdating, isError }] = usePostFormsIdApplicationsMutation()
  const handleSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  if (submitted && form) return (
    <div className="contact-form">
      <p className="contact-form__content">{form.post_send}</p>
    </div>
  )
*/

/*
type ContactFormTypeSchema = Record<ContactFormType["type"], yup.ObjectSchema<any>>
const schemaByType: ContactFormTypeSchema = {
  "become_mentor": yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
  }).required(),
  "choose_mentor": yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
  }).required(),
  "test_meeting": yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
  }).required(),
  "still_questions": yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
  }).required()
}
*/

/*
  function _onSubmit(event: FormEvent<HTMLFormElement>) {
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
      .query(postFormsIdApplications(form.id, location.pathname, inputValues))
      .then(({ error }) => {
        if (error) return

        setSubmitted(true)
        props.onSubmit?.()
      })
  }
  */

/*
  const includesSocial = (field: FormFieldType) => ["telegram", "facebook", "whats_app", "viber"].includes(field.type)
  const name = form?.fields.find(field => field.type === "name")
  const email = form?.fields.find(field => field.type === "email")
  const social = form?.fields.find(field => socialMask?.value ? (field.type === socialMask?.value) : includesSocial(field))
  const about = form?.fields.find(field => field.type === "about")
  */

/*
  const elementContent = (
    <>
      {!form &&
        <LoaderCover />
      }

      {form && 
        form.fields.map(field => <Field key={field.type} 
          name={field.type} 
          type={typeByName[field.type]}
        />)
      }
    </>
  )

  return (
    <Formus onSubmit={handleSubmit} 
      elementContent={elementContent}
      schema={schemaByType[type]}
    />
  )
  */
  
/*
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {form == null && (
        <LoaderCover />
      )}
      {!!form?.description?.length && (
        <div className="contact-form__content">
          <ReactMarkdown>{form.description}</ReactMarkdown>
        </div>
      )}
      <div className="contact-form__inputs">
        {name && (
          <Input placeholder={name.placeholder} type="text" name="name" required />
        )}

        {email && (
          <Input placeholder={email.placeholder} type="email" name="email" required />
        )}

        {social && (
          <Input placeholder={social.placeholder} name={socialMask?.value} required masks={mapInputMasks()} onChange={onPhoneOrNickChange} onMaskSelect={setSocialMask} />
        )}

        {about && (
          <div className="input">
            <textarea className="input__input" name="about" placeholder={about.placeholder}></textarea>
          </div>
        )}
      </div>
      
      <Button className="contact-form__submit" size="big" type="submit" color="dark" eventLabel="Contact Form">{props.submitText || t("submit")}</Button>

      <div className="contact-form__terms">{t("terms", { policyLink: links?.privacy_policy.url })}</div>
    </form>
  )
  */

/*
import { postFormsIdApplications } from "api/actions/form"
import { getPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Input, { InputStrainType as InputMaskType } from "app/components/UI/Input/Input"
// import { FormElements } from "interfaces/common"
// import { FormFieldType, FormType, PageLinkType } from "interfaces/types"
import { ChangeEvent, FormEvent, useState } from "react"
// import { useQuery } from "react-fetching-library"
import { DefaultRootState, useSelector } from "react-redux"
*/
