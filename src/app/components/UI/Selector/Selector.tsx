import "./Selector.scss"

import { Children, ComponentProps, Dispatch, ReactElement, useState } from "react"

import DropDown from "../DropDown/DropDown"


interface SelectorProps<V> {
  name?: string
  defaultValue?: string
  onChange?: Dispatch<V>
  children: ReactElement<ComponentProps<"option">>[]
}

function Selector<V = string | undefined>(props: SelectorProps<V>) {
  const options = Children.map(props.children, child => child.props)
  const [current, setCurrent] = useState<string>(String(options[0].children))
  const [expanded, setExpanded] = useState(false)
  function onChange(value: V, children: string) {
    props.onChange?.(value)
    setCurrent(children)
  }
  return (
    <div className="selector">
      <div className="selector__current" onClick={() => setExpanded(!expanded)}>{current}</div>
      <DropDown name={props.name} expanded={expanded} onChange={onChange}>{props.children}</DropDown>
    </div>
  )
}


export default Selector
