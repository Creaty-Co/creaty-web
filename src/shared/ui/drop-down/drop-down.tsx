import "./drop-down.scss"

import { classWithModifiers } from "@shared/utils"
import { Children, ComponentProps, ReactElement, useState } from "react"

export type DropDownOption = ReactElement<ComponentProps<"option">>

export interface DropDownProps<V> {
  expanded: boolean
  default?: V

  name?: string
  onSelect(value: V, children: unknown, index: number): void
  children: DropDownOption[]
}

export function DropDown<V = string | undefined>(props: DropDownProps<V>) {
  const options = Children.map(props.children, child => child.props)
  const initChoice = props.default ? options.findIndex(option => option.value === props.default) : 0
  const [choice, Choose] = useState<number>(initChoice)
  return (
    <section className={classWithModifiers("drop-down", props.expanded && "expanded")} role="listbox" aria-expanded={props.expanded}>
      {options.map((option, index) => (
        <div
          className={classWithModifiers("drop-down__option", choice === index && "selected")}
          onClick={() => (Choose(index), props.onSelect(option.value as unknown as V, option.children, index))}
          key={index}
        >{option.children}</div>
      ))}
      {props.name && (
        <input type="hidden" name={props.name} value={options[choice].value} />
      )}
    </section>
  )
}