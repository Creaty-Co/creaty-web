import { history } from "@app/App"
import { useAppDispatch } from "@app/store"
import { signUpStep1 } from "@features/auth/auth.slice"
import { LoginForm } from "@features/auth/Login/LoginForm"
import { open, PopupLayout } from "@shared/layout"
import { Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

import { ISignUpFormStep1 } from "../auth.types"
import { SignupFormStep2 } from "./SignupFormStep2"

const schema = yup
  .object()
  .shape({
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup
      .string()
      .test("passwordsMatch", "Passwords must match", function (value) {
        return this.parent.password === value
      })
      .test("upperLowerCase", "UPPERCASE & lowercase letters", function (value) {
        return /[A-Z]/.test(value ?? "") && /[a-z]/.test(value ?? "")
      })
      .test("containNumber", "contain at least 1 number", function (value) {
        return /\d/.test(value ?? "")
      })
      .min(8, "Please enter a password more than 8 character")
      .required("Password is required"),
    password2: yup
      .string()
      .test("passwordsMatch", "Passwords must match", function (value) {
        return this.parent.password === value
      })
      .test("upperLowerCase", "UPPERCASE & lowercase letters", function (value) {
        return /[A-Z]/.test(value ?? "") && /[a-z]/.test(value ?? "")
      })
      .test("containNumber", "contain at least 1 number", function (value) {
        return /\d/.test(value ?? "")
      })
      .min(8, "Please enter a password more than 8 character")
      .required("Repeat the password is required"),
  })
  .required()

const CN = "form"
const MOD = "signup"
const { getElement, getModifier } = bem(CN)

export function SignupFormStep1() {
  const dispatch = useAppDispatch()

  const handleSubmit = (values: FieldValues) => {
    const data: ISignUpFormStep1 = { email: values.email, password: values.password }
    dispatch(signUpStep1(data))
    dispatch(open(<SignupFormStep2 />))
  }

  const handleGoogleClick = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)
  const handleSignUpRedirect = () => dispatch(open(<LoginForm />))

  const elementContent = (
    <>
      <span className={cn(getElement("suggestion"))}>
        Already have an account?{" "}
        <em className={cn(getElement("redirection"))} onClick={handleSignUpRedirect}>
          Log In
        </em>
      </span>
      <Field type="input" name="email" label="Email address*" />
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
        schema={schema}
        onSubmit={handleSubmit}
      />
    </PopupLayout>
  )
}
