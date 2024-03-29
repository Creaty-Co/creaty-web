import { history } from "@app/App"
import { Field } from "@shared/ui/field/field"
import { Formus } from "@shared/ui/Formus/Formus"
import { OuterLink } from "@shared/ui/OuterLink/OuterLink"
import { PopupLayout } from "@shared/ui/PopupLayout/PopupLayout"
import { bem } from "@shared/utils/common"
import { signUpStep1 } from "@store/auth/auth.slice"
import { ISignUpFormStep1 } from "@store/auth/auth.types"
import { openModal } from "@store/modalContainer.slice"
import { useAppDispatch } from "@store/store"
import { Button, Modal } from "antd"
import cn from "classnames"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import * as yup from "yup"

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

interface IProps {
  show: boolean
}

export function SignupModalFormStep1({ show }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.signUpStep1" })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const closeModal = () => navigate("/")
  const handleSubmit = (values: FieldValues) => {
    const data: ISignUpFormStep1 = { email: values.email, password: values.password }
    dispatch(signUpStep1(data))
    dispatch(openModal(<SignupFormStep2 />))
    closeModal()
  }

  const handleGoogleClick = () => history.push(`${process.env.REACT_APP_API_HOST}/users/register/social/google/`)
  const handleLoginRedirect = () => navigate("/login")

  const elementContent = (
    <>
      <span className={cn(getElement("suggestion"))}>
        {`${t("header")} `}
        <em className={cn(getElement("redirection"))} onClick={handleLoginRedirect}>
          {t("return")}
        </em>
      </span>
      <Field type="input" name="email" label="Email*" />
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
        {t("mainButtonText")}
      </Button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <Button className="button button--google button--biggest button__text" onClick={handleGoogleClick}>
        {t("googleButtonText")}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        {t("terms")}
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Modal
      open={show}
      onCancel={closeModal}
      footer={null}
      closable={false}
      keyboard={false}
      style={{ top: window.innerWidth <= 600 ? 16 : undefined }}
    >
      <PopupLayout
        onClose={closeModal}
        title={<h3 className={cn("font--h3-bold popup-layout__title", getElement("title"))}>{t("title")}</h3>}
      >
        <Formus
          className={cn(getModifier(CN, MOD))}
          elementContent={elementContent}
          elementControl={elementControl}
          schema={schema}
          onSubmit={handleSubmit}
        />
      </PopupLayout>
    </Modal>
  )
}
