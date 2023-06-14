import "./field.scss"

import { FieldInputType } from "./field.types"
import { FieldInput, FieldPassword, FieldTextarea, IFieldInput, IFieldPassword, IFieldTextarea } from "./ui"

export type IFieldFactory = Record<FieldInputType, Function>
export const FieldFactory: IFieldFactory = {
  input: FieldInput,
  password: FieldPassword,
  textarea: FieldTextarea,
  select: FieldInput,
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
