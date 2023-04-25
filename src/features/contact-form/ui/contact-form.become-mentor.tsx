import { useAppDispatch, useAppSelector } from "@app/store"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"
import { Button, Field, Formus } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import cn from "classnames"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { usePostFormsIdApplicationsMutation } from "../contact-form.api"
import { selectContactFormByType, submit } from "../contact-from.slice"

const schema = yup.object().shape({
  name: yup.string()
    .required("Name"),

  email: yup.string()
    .test("email", function(value) {  
      return (value && isEmail(value)) || this.createError({ path: this.path, message: "invalid email" }) 
    })
    .required("Email"),

  about: yup.string().max(256, ({ value }) => {
    return `Maximum 300 symbols. Now It's ${value.length}`
  }),

  url: yup.string().test("linkedin-url", function(value) {
    if (!value) return this.createError({ path: this.path, message: "no url" })

    const regex = /^(?:http(?:s?):\/\/)?(?:www\.)?linkedin\.[a-z]+\/(?:in\/)(?<username>[A-Za-z0-9]+)\/?$/gi
    const [ result ] = value.matchAll(regex)

    return (result && !!result.groups?.username) || this.createError({ path: this.path, message: "no valid url" })
  })
}).required()

export interface IContactFormBecomeMentor {
  className?: string  
}

const CN = "form"
const MOD = "become-mentor"
const { getElement, getModifier } = bem(CN)
const FORM_TYPE = "become_mentor"

export function ContactFormBecomeMentor({ 
  className
}: IContactFormBecomeMentor) {

  const form = useAppSelector(selectContactFormByType(FORM_TYPE))
  const dispatch = useAppDispatch()

  const [ postFormsIdApplications, { isLoading } ] = usePostFormsIdApplicationsMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      id: form.id,
      path: document.location.pathname,
      values
    })
    
    dispatch(submit({ type: FORM_TYPE }))
  }

  const hintsAbout = {
    max: "Max width is 256 symbols"
  }
  
  const hintsEmail = {
    email: "Should be like@this.com"
  }

  const hintsUrl = {
    "linkedin-url": "Should be likedin.com/in/username"
  }

  const elementContent = <>
    <Field disabled={isLoading} type="input" name="name" label="Name*" />
    <Field disabled={isLoading} type="input" name="email" label="Email*" hints={hintsEmail} />
    <Field disabled={isLoading} type="textarea" name="about" label="About you" placeholder="Tell us about yourself!" hints={hintsAbout}/>
    <Field disabled={isLoading} type="input" name="url" label="LinkedIn profile" hints={hintsUrl} />
  </>

  const elementControl = <>
    <Button disabled={isLoading} size="biggest" color="dark" type="submit">
      <span className="flex gap-3 flex-row">
        <ChatBubbleBottomCenterIcon className="text-white w-5 h-5" />
        Send application
      </span>
    </Button>

    <div 
      className={cn(getElement("agreement"),
        "text-gray-800 text-center"
      )}
    >
      By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
    </div>  
  </>

  return (
    <Formus
      className={cn(getModifier(CN, MOD), className)}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}