import { useAppDispatch } from "@app/store"
import { useLazySignUpGoogleQuery } from "@features/auth/auth.api"
import { setSignUpStep, signUpStep1 } from "@features/auth/auth.slice"
import { skipToken } from "@reduxjs/toolkit/query"
import { PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { FieldValues } from "react-hook-form"

import { formSignupStep1Schema } from "./validationSchemas"

const CN = "form"
const MOD = "signup"
const { getElement, getModifier } = bem(CN)

export function FormSignupStep1() {
  const dispatch = useAppDispatch()

  const [signUpGoogle] = useLazySignUpGoogleQuery()

  const handleSubmit = (values: FieldValues) => {
    const { email, password } = values
    dispatch(signUpStep1({ email, password }))
    dispatch(setSignUpStep(2))
  }

  const handleGoogleClick = async () => {
    signUpGoogle(skipToken)
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
      <Button className="button button--dark button--biggest button__text" type="primary" htmlType="submit">
        Continue with email
      </Button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <Button
        className="button button--google button--biggest button__text"
        htmlType="submit"
        onClick={handleGoogleClick}>
        Continue with Google
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
      </div>
    </>
  )

  return (
    <PopupLayout title="Sign up to find your perfect mentor" width="35em">
      <Formus
        className={cn(getModifier(CN, MOD))}
        elementContent={elementContent}
        elementControl={elementControl}
        schema={formSignupStep1Schema}
        onSubmit={handleSubmit}
      />
    </PopupLayout>
  )
}
