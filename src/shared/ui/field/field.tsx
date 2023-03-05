import "./field.scss"

import { FieldInputType } from "./field.types"
import { FieldInput } from "./field-input"

export type IFieldFactory = Record<FieldInputType, Function>
export const FieldFactory: IFieldFactory = {
  "input": FieldInput,
  "password": FieldInput,
  "textarea": FieldInput,
  "select": FieldInput,
}

export interface IField {
  className?: string

  type: FieldInputType
  name: string

  helper?: string
  label?: string
}

export function Field({
  className,

  type,
  name,
  
  helper,
  label
}: IField) {
  const Component = FieldFactory[type]

  return <Component
    className={className}
    name={name}

    helper={helper}
    label={label}
  />
} 