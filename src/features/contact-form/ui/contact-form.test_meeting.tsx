import { useAppDispatch, useAppSelector } from "@app/store"
import { selectContactFormByType, submitForm } from "@features/contact-form"
import { Button, Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

import { usePostFormsIdApplicationsMutation } from "../contact-form.api"

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  about: yup.string()
}).required()

export interface IContactFormTestMeeting {
  className?: string  
}

const CN = "form"
const MOD = "still-quetion"
const { getElement, getModifier } = bem(CN)

export function ContactFormTestMeeting({ 
  className
}: IContactFormTestMeeting) {
  // const { t } = useTranslation("translation", { keyPrefix: "contactForm.test_meeting" })
  const { t } = useTranslation("translation", { keyPrefix: "other.test_meeting" })
  const form = useAppSelector(selectContactFormByType("test_meeting"))
  const dispatch = useAppDispatch()

  const [postFormsIdApplications] = usePostFormsIdApplicationsMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await postFormsIdApplications({
      id: form.id,
      path: document.location.pathname,
      values
    })
    
    dispatch(submitForm({ type: "test_meeting" }))
  }

  const elementContent = <>
    <Field type="input" name="name" label="Name" />
    <Field type="input" name="email" label="Email address" />
    <Field type="textarea" name="about" label="About" />
  </>

  const elementControl = <>
    <Button size="biggest" color="dark" type="submit">
      {t("submitText")}
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