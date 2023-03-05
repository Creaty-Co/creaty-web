import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { bem, classMerge } from "@shared/utils"
import { FieldValues, useForm, useFormContext, UseFormRegister } from "react-hook-form"

import { FieldInputType } from "./field.types"

export interface IInputOptions {
  placeholder?: string
}

export interface IFieldInput {
  className?: string
  
  helper?: string
  label?: string
  name: string
}

const CN = "field"
const MOD = "input"
const { getElement, getModifier } = bem(CN)

export function FieldInput({
  className,

  helper,
  label,
  name
}: IFieldInput) {

  const { register, getFieldState, formState: { isDirty: isDirtyForm, isValid: isValidForm, errors: errorsForm } } = useFormContext()
  const { error, isDirty, isTouched, invalid } = getFieldState(name)
  
  return (
    <label className={classMerge(
      getModifier(CN, MOD),
      className,
      "grid grid-cols-1 grid-flow-row auto-rows-auto gap-y-1")}>
      { label && 
        <span
          className={classMerge(getElement("label"),
            "block text-gray-800"
          )}
        >{label}</span> 
      }

      <div className="relative m-0 border-0">
        <input {...register(name)}
          className={classMerge(getElement("input"),
            "block w-full px-3 py-3 bg-gray-50",
            "text-black-900",
            "rounded-xl border-2",
            "focus:ring-0 focus:outline-none",
            "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500",
            /*
            !error && !isTouched && !isDirty
              ? "border-gray-350 focus:border-gray-500" : "",
            !error && isTouched
              ? "border-gray-350 focus:border-gray-500" : "",
            !error && isDirty
              ? "border-gray-350 focus:border-gray-500" : "",
            */
            !isDirty
              ? "border-gray-350 focus:border-gray-500" : "",
            !invalid && isDirty
              ? "border-green-700 focus:border-green-700" : "",
            invalid && isDirty
              ? "border-red focus:border-red" : "",
          )}

        />

        {isDirty && 
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {!invalid && <CheckCircleIcon className="h-5 w-5 text-green-700" /> }
            {invalid && <XCircleIcon className="h-5 w-5 text-red" /> }
          </div>
        }

      </div>

      { helper && <span className={classMerge(getElement("helper"))}>{helper}</span> }
    </label>
  )
} 