import { Button, Field, Formus } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import cn from "classnames"
import * as yup from "yup"

const schema = yup.object().shape({
  fullname: yup.string().min(3).required("Full Name"),
  email: yup.string().test("email", function(value) {
    const { path, createError } = this
    return (value && isEmail(value)) || createError({ path, message: "invalid email" })
  }).min(3).required("Email")
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

  const elementContent = <>
    <Field type="input" name="fullname" label="Full name" />
    <Field type="input" name="email" label="Email" />
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
      onSubmit={() => null}
    />
  )
}