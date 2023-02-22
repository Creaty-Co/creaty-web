import "./Field.scss"

import { bem,classMerge } from "utils/common"


export interface FieldProps {
  className?: string

  helper?: string
  label?: string
}

const CN = "field" 
const { getElement, getModifier } = bem(CN)

export default function Field({
  className,

  helper,
  label
}: FieldProps) {
  return (
    <label className={classMerge(CN, className, "grid grid-cols-1 grid-flow-row auto-rows-auto")}>
      { label && 
        <span
          className={classMerge(getElement("label"),
            "block text-sm font-medium text-gray-700"
          )}
        >{label}</span> 
      }

      <input
        type="email"
        placeholder="you@example.com"
        className={classMerge(getElement("input"),
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        )}
      />

      { helper && <span className={classMerge(getElement("helper"))}>{helper}</span> }
    </label>
  )
} 