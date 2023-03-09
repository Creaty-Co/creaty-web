import { useAppDispatch, useAppSelector } from "@app/store"
import { Button, Field, Formus } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import cn from "classnames"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { usePostFormsIdApplicationsMutation } from "../contact-form.api"
import { selectContactFormByType, submit } from "../contact-from.slice"

const schema = yup.object().shape({
  fullname: yup.string().required("Full Name"),
  email: yup.string().test("email", function(value) {
    const { path, createError } = this
    return (value && isEmail(value)) || createError({ path, message: "invalid email" })
  }).required("Email")
}).required()

export interface IContactFormStillQuestions {
  className?: string
}

const CN = "formus"
const MOD = "still-quetion"
const { getElement, getModifier } = bem(CN)

export function ContactFormStillQuestions({ 
  className
}: IContactFormStillQuestions) {
  const form = useAppSelector(selectContactFormByType("still_questions"))
  const dispatch = useAppDispatch()

  const [ postFormsIdApplications, { isLoading } ] = usePostFormsIdApplicationsMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      id: form.id,
      path: document.location.pathname,
      values
    })
    
    dispatch(submit({ type: "still_questions" }))
  }

  const hintsEmail = {
    email: "Should be like@this.com"
  }

  const elementContent = <>
    <Field disabled={isLoading} type="input" name="fullname" label="Full name" />
    <Field disabled={isLoading} hints={hintsEmail} type="input" name="email" label="Email" />
  </>

  const elementControl = <>
    <Button size="biggest" color="dark" type="submit">
      Get Help
    </Button>

    <div 
      className={cn(getElement("agreement"),
        "text-gray-800 text-center"
      )}
    >
      By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use</em> and <em>Privacy Policy</em>
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
