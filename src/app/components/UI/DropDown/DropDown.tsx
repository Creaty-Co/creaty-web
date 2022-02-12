import "./DropDown.scss"

import { Children, ComponentProps, Dispatch, ReactElement, useState } from "react"
import { classWithModifiers } from "utils/common"



interface DropDownProps<V> {
  expanded: boolean
  default?: V

  name?: string
  onChange(value: V, children: unknown): void
  children: ReactElement<ComponentProps<"option">>[]
}

function DropDown<V = string | undefined>(props: DropDownProps<V>) {
  const options = Children.map(props.children, child => child.props)
  const initChoice = props.default ? options.findIndex(option => option.value === props.default) : 0
  const [choice, Choose] = useState<number>(initChoice)
  return (
    <section className={classWithModifiers("drop-down", props.expanded && "expanded")} role="listbox" aria-expanded={props.expanded}>
      {options.map((option, index) => (
        <option
          className={classWithModifiers("drop-down__option", choice === index && "selected")}
          onClick={() => (Choose(index), props.onChange(option.value as unknown as V, option.children))}
          key={index}
        >{option.children}</option>
      ))}
      {props.name && (
        <input type="hidden" name={props.name} value={options[choice].value} />
      )}
    </section>
  )
}


export default DropDown
