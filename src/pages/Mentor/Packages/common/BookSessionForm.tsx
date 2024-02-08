import { Field } from "@shared/ui/field/field"
import { Formus } from "@shared/ui/Formus/Formus"
import { OuterLink } from "@shared/ui/OuterLink/OuterLink"
import { bem } from "@shared/utils/common"
import { authUserDataS } from "@store/auth/auth.slice"
import { useAppSelector } from "@store/store"
import { Button } from "antd"
import cn from "classnames"
import { memo } from "react"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
  })
  .required()

const CN = "form"
const { getElement } = bem(CN)

interface IProps {
  isLoading: boolean
  submitText: string
  terms: string
  id: string
  onSubmit(values: FieldValues): void
}

export const BookSessionForm = memo(function BookSessionForm({ isLoading, submitText, terms, id, onSubmit }: IProps) {
  const { firstName, email } = useAppSelector(authUserDataS)

  const elementContent = (
    <>
      <Field type="input" name="name" label="Name*" defaultValue={firstName} />
      <Field type="input" name="email" label="Email*" defaultValue={email || undefined} />
      <Field type="textarea" name="description" label="How can a mentor help? (You can discuss this later)" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--violet button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
        id={`${id}FormSubmitButton`}
      >
        {submitText}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        {terms}
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Formus
      className="form"
      elementControl={elementControl}
      elementContent={elementContent}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
})
