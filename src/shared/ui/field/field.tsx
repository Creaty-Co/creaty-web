import "./field.scss"

import { FieldInputType } from "./field.types"
import { FieldInput, IFieldInput } from "./ui"

export type IFieldFactory = Record<FieldInputType, Function>
export const FieldFactory: IFieldFactory = {
  "input": FieldInput,
  "password": FieldInput,
  "textarea": FieldInput,
  "select": FieldInput,
}

type IFieldComponent = IFieldInput
export interface IField extends IFieldComponent {
  type: FieldInputType
  name: string
}

export function Field(props: IField) {
  const Component = FieldFactory[props.type]

  return <Component {...props}/>
} 