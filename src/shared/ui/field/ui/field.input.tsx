import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import { FieldHints } from "./field.hints"

export interface IInputOptions {
  placeholder?: string
}

export interface IFieldInput {
  className?: string
  disabled?: boolean
  defaultValue?: string | null

  hints?: Record<string, string>
  helper?: string
  label?: string

  name: string
}

const CN = "field"
const MOD = "input"
const { getElement, getModifier } = bem(CN)

export function FieldInput({ className, disabled, defaultValue, helper, hints, label, name }: IFieldInput) {
  const [focused, setFocused] = useState(false)

  const { register, getFieldState, getValues, setValue } = useFormContext()
  const { error, isDirty, invalid } = getFieldState(name)
  const value = getValues(name)

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue)
  }, [name, defaultValue])

  return (
    <label
      className={cn(
        getModifier(CN, MOD),
        className,
        "grid grid-cols-1 grid-flow-row auto-rows-auto gap-y-1",
        "relative"
      )}
    >
      {label && <span className={cn(getElement("label"), "block text-gray-800")}>{label}</span>}

      <div className="relative m-0 border-0">
        <input
          {...register(name)}
          className={cn(
            getElement("input"),
            "block w-full px-3 py-3 bg-gray-50",
            "text-black-900",
            "rounded-xl border-2",
            "focus:ring-0 focus:outline-none",
            "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500",
            !isDirty ? "border-gray-350 focus:border-gray-500" : "",
            !invalid && isDirty ? "border-green-700 focus:border-green-700" : "",
            invalid && isDirty ? "border-red focus:border-red" : ""
          )}
          disabled={disabled !== undefined ? disabled : false}
          autoComplete="on"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {isDirty && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {!invalid && <CheckCircleIcon className="h-5 w-5 text-green-700" />}
            {invalid && <XCircleIcon className="h-5 w-5 text-red" />}
          </div>
        )}

        {focused && hints && (
          <FieldHints
            hints={hints}
            {...{
              isDirty,
              error,
              value,
            }}
          />
        )}
      </div>

      {helper && <span className={cn(getElement("helper"))}>{helper}</span>}
    </label>
  )
}
