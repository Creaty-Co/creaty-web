import { useAppDispatch, useAppSelector } from "@app/store"
import { Button, Field, Formus } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import cn from "classnames"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { signUp } from "../auth.slice"
// import { IAuthSignIn } from "../auth.types"

const CN = "formus"
const MOD = "sign-up"
const { getElement, getModifier } = bem(CN)

const schema = yup.object().shape({
  email: yup.string().test("email", function(value) {
    const { path, createError } = this
    return (value && isEmail(value)) || createError({ path, message: "invalid email" })
  }).required("Email"),

  password: yup.string().min(8).test("numbers", function(value) {
    const { path, createError } = this

    const hasNumber = value && value.match(/[0-9]/)

    return (!!hasNumber) || createError({ path, message: "Need at least 1 number" })
  }).test("letters", function(value) {
    const { path, createError } = this

    const hasSmallLetter = value && value.match(/[a-z]/)
    const hasBigLetter = value && value.match(/[A-Z]/)

    return !!(hasSmallLetter && hasBigLetter) || 
      createError({ path, message: "Need UPPERCASE and lowercase letters" })
  }).required("Password"),
}).required()

const hintsPassword = {
  min: "8 characters long (minimum)",
  letters: "UPPERCASE & lowercase letters",
  numbers: "At least 1 number",
}
const hintsEmail = {
  email: "Should be like@this.com"
}

export interface IAuthFormSignUpProps {
  className?: string
  onSubmit: () => void
}

export const AuthFormSignUp = ({
  className,
  onSubmit
}: IAuthFormSignUpProps) => {
  const dispatch = useAppDispatch()

  const onSubmitHandler: SubmitHandler<FieldValues> = (values: FieldValues) => {
    const { password, email } = values
    dispatch(signUp({ password, email }))
    onSubmit()
  }

  const elementContent = <>
    <Field type="input" name="email" label="Email" hints={hintsEmail} />
    <Field type="password" name="password" label="Password" hints={hintsPassword} />
  </>

  const elementControl = <>
    <Button size="biggest" color="dark" type="submit">
      Continue with email
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
      className={cn(getModifier(CN, MOD), className, "overflow-visible")}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmitHandler}
    />
  )
}
