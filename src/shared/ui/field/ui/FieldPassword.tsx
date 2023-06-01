import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

import { FieldHints } from "./field.hints"

export interface IPasswordOptions {
  placeholder?: string
}

export interface IFieldPassword {
  className?: string
  disabled?: boolean

  hints?: Record<string, string>
  helper?: string
  label?: string

  name: string
}

const CN = "field"
const MOD = "input"
const { getElement, getModifier } = bem(CN)

export function FieldPassword({ className, disabled, helper, hints, label, name }: IFieldPassword) {
  const [focused, setFocused] = useState(false)

  const { register, getFieldState, getValues } = useFormContext()
  const { error, isDirty, invalid } = getFieldState(name)
  const value = getValues(name)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => setIsPasswordVisible(prevState => !prevState)

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
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="new-password"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-6 flex items-center px-4 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>

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
