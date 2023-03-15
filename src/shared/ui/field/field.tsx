import "./field.scss"

import { FieldInputType } from "./field.types"
import { FieldInput, FieldTextarea, IFieldInput, IFieldTextarea } from "./ui"

export type IFieldFactory = Record<FieldInputType, Function>
export const FieldFactory: IFieldFactory = {
  "input": FieldInput,
  "password": FieldInput,
  "textarea": FieldTextarea,
  "select": FieldInput,
}

export type IFieldComponent = IFieldInput | IFieldTextarea
export interface IField extends IFieldInput, IFieldTextarea {
  type: FieldInputType
  name: string
}

export function Field(props: IField) {
  const Component = FieldFactory[props.type]

  return <Component {...props}/>
} 