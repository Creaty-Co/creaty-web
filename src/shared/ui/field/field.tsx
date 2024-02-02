import "./field.scss"

import { FieldInput, FieldPassword, FieldTextarea, IFieldInput, IFieldPassword, IFieldTextarea } from "./ui"

export type FieldInputType = "input" | "textarea" | "password"

export type IFieldFactory = Record<FieldInputType, any>
export const FieldFactory: IFieldFactory = {
  input: FieldInput,
  password: FieldPassword,
  textarea: FieldTextarea,
}

export type IFieldComponent = IFieldInput | IFieldTextarea | IFieldPassword
export interface IField extends IFieldInput, IFieldTextarea, IFieldPassword {
  type: FieldInputType
  name: string
  defaultValue?: string | null
}

export function Field(props: IField) {
  const Component = FieldFactory[props.type]

  return <Component {...props} />
}
