import "./field.textarea.scss"

import { bem } from "@shared/utils/common"
import cn from "classnames"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

import { FieldHints } from "./field.hints"

export interface IFieldTextarea {
  placeholder?: string
  className?: string
  disabled?: boolean

  hints?: Record<string, string>
  helper?: string
  label?: string

  name: string
}

const CN = "field"
const MOD = "textarea"
const { getElement, getModifier } = bem(CN)

export function FieldTextarea({ placeholder, className, disabled, helper, hints, label, name }: IFieldTextarea) {
  const [focused, setFocused] = useState(false)

  const { register, getFieldState } = useFormContext()
  const { error, isDirty, invalid } = getFieldState(name)

  return (
    <label
      className={cn(
        getModifier(CN, MOD),
        className,
        "grid grid-cols-1 grid-flow-row auto-rows-auto gap-y-1",
        "relative",
        invalid && getModifier(CN, "invalid")
      )}
    >
      {label && <span className={cn(getElement("label"), "block text-gray-800")}>{label}</span>}

      <div className="relative m-0 border-0">
        <textarea
          {...register(name)}
          rows={3}
          className={cn(
            getElement("textarea"),
            "block w-full px-3 py-3 bg-gray-50",
            "text-black-900",
            "rounded-xl border-2 rounded-br-sm",
            "focus:ring-0 focus:outline-none",
            "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500",
            !isDirty ? "border-gray-350 focus:border-gray-500" : "",
            !invalid && isDirty ? "border-green-700 focus:border-green-700" : "",
            invalid && isDirty ? "border-red focus:border-red" : ""
          )}
          placeholder={placeholder}
          disabled={disabled !== undefined ? disabled : false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {focused && hints && (
          <FieldHints
            hints={hints}
            {...{
              isDirty,
              error,
            }}
          />
        )}
      </div>

      {helper && <span className={cn(getElement("helper"))}>{helper}</span>}
    </label>
  )
}
