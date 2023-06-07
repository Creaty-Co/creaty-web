export interface FormRequestParamsType {
  id: number
  path: string
  values: Record<string, string>
}

export type FormTypes = "choose_mentor" | "test_meeting" | "still_questions" | "signup_mentor"

export interface FormFieldType {
  value?: string | number | boolean
  name: string
}

export interface FormType {
  id: number

  fields: FormFieldType[]
  type: FormTypes

  submitted: boolean
}

export enum FormFieldFieldTypeEmum {
  about = "textarea",
  email = "input",
  name = "input",
}

export interface IFormState extends Record<FormType["type"], FormType> {}

export interface IForm {
  type: FormType["type"]
  className?: string
}

export interface IFormProps {
  className?: string
}

export interface IFormFactory extends Record<FormType["type"], React.FC<IFormProps>> {}
