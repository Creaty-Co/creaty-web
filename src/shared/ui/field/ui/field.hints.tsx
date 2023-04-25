import "./field.hints.scss"

import { CheckCircleIcon, CheckIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { bem } from "@shared/utils"
import cn from "classnames"
import { FieldError } from "react-hook-form" 

const CN = "field-hints"
const { getElement } = bem(CN)

export interface IFieldHints {
  hints: Record<string,string>
  value?: string

  isDirty: boolean
  error: FieldError | undefined
}

export const FieldHints = ({ hints, isDirty, error }: IFieldHints) => {
  const rElements = Object.keys(hints).map((hint: string) => {
    const isValid = !(error && "types" in error && error.types && hint in error.types)
    return <FieldHint key={hint} {...{ 
      isDirty, isValid, 
      hint: hints[hint]
    }} />
  })

  return (
    <div 
      className={cn(
        getElement("hints"),
        "absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10",
        "px-5 py-3 w-max",
        "bg-black-main opacity-90 rounded-md",
      )}
    >
      {rElements}
    </div>
  )
}

export interface IFieldHint {
  isDirty: boolean
  isValid: boolean
  hint: string
}

export const FieldHint = ({ hint, isDirty, isValid, }: IFieldHint) => (
  <div 
    className={cn(
      getElement("hint-item"), 
      "grid grid-cols-[auto_1fr] justify-start align-baseline gap-2"
    )}
  >
    {
      (!isDirty && <CheckIcon className="h-5 w-5 text-gray-700" />) ||
      (!isValid && <XCircleIcon className="h-5 w-5 text-red" />) ||
      <CheckCircleIcon className="h-5 w-5 text-green-700" />
    }
    
    <span className={cn(isDirty && isValid? "text-white" : "text-gray-700")}>
      {hint}
    </span>
  </div>
)