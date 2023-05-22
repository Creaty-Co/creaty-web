import { useAppDispatch } from "@app/store"
import { signUpStep1 } from "@features/auth/auth.slice"
import { Button, Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { FieldValues } from "react-hook-form"

import { formSignupStep1Schema } from "./validationSchemas"

const CN = "form"
const MOD = "signup"
const { getElement, getModifier } = bem(CN)

interface IProps {
  goToNextStep: () => void
}

export function FormSignupStep1({ goToNextStep }: IProps) {
  const dispatch = useAppDispatch()

  const handleSubmit = (values: FieldValues) => {
    const { email, password } = values
    dispatch(signUpStep1({ email, password }))
    goToNextStep()
  }

  const handleGoogleClick = () => {
    console.log("google")
  }

  const elementContent = (
    <>
      <Field
        type="input"
        name="email"
        label="Email address*"
        hints={{
          email: "Should be like@this.com",
        }}
      />
      <Field
        type="password"
        name="password"
        label="Password 8+ characters*"
        hints={{
          min: "8 characters long (minimum)",
          passwordsMatch: "Passwords must match",
          upperLowerCase: "UPPERCASE & lowercase letters",
          containNumber: "contain at least 1 number",
        }}
      />
      <Field
        type="password"
        name="password2"
        label="Repeat the password*"
        hints={{
          min: "8 characters long (minimum)",
          passwordsMatch: "Passwords must match",
          upperLowerCase: "UPPERCASE & lowercase letters",
          containNumber: "contain at least 1 number",
        }}
      />
    </>
  )

  const elementControl = (
    <>
      <Button size="biggest" color="dark" type="submit">
        Continue with email
      </Button>
      <br />
      <Button size="biggest" color="google" onClick={handleGoogleClick}>
        Continue with Google
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
      </div>
    </>
  )

  return (
    <Formus
      className={cn(getModifier(CN, MOD))}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={formSignupStep1Schema}
      onSubmit={handleSubmit}
    />
  )
}
