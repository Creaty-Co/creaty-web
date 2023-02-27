import "./Field.scss"

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
// import { memo } from "react"
import { FieldValues,useForm, useFormContext, UseFormRegister } from "react-hook-form"
import { bem,classMerge } from "utils/common"


/*const NestedInput = memo(
  ({ register, formState: { isDirty } }) => (
    <div>
      <input {...register("test")} />
      {isDirty && <p>This field is dirty</p>}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
)*/

/*
export const FieldContainer = ({ children }) => {
  const methods = useFormContext()

  return <NestedInput {...methods} />
}*/ 

interface InputOptions {
  placeholder?: string
}
export interface FieldProps {
  name: string

  className?: string

  helper?: string
  label?: string

  input?: InputOptions
}

const CN = "field" 
const { getElement, getModifier } = bem(CN)

/*export default memo(Field, (prevProps, nextProps) =>
  prevProps.formState.isDirty === nextProps.formState.isDirty)*/

export default function Field({
  name,

  className,
  
  input,

  helper,
  label
}: FieldProps) {
  // const { register, getFieldState, formState: { isDirty: isDirtyForm, isValid: isValidForm, errors: errorsForm } } = useForm()
  const { register, getFieldState, formState: { isDirty: isDirtyForm, isValid: isValidForm, errors: errorsForm } } = useFormContext()
  const { error, isDirty, isTouched, invalid } = getFieldState(name)
  
  console.group("name", name.toUpperCase())
  console.log("error", error)
  console.log("isDirty", isDirty)
  console.log("isTouched", isTouched)
  console.groupEnd()

  return (
    <label className={classMerge(CN, className, "grid grid-cols-1 grid-flow-row auto-rows-auto gap-y-1")}>
      { label && 
        <span
          className={classMerge(getElement("label"),
            "block text-gray-800"
          )}
        >{label}</span> 
      }

      <div className="relative m-0 border-0">
        {/* placeholder={input?.placeholder} */}
        <input {...register(name)}
          className={classMerge(getElement("input"),
            "block w-full px-3 py-3",
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