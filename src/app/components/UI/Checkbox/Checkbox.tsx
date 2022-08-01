import "./Checkbox.scss"

import _ from "lodash"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

export interface CheckboxProps<V> extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value"> {
  value?: V
}

function Checkbox<V>(props: CheckboxProps<V>) {
  return (
    <label className="checkbox">
      <input {..._.omit(props, "children")} value={props.value && String(props.value)} type="checkbox" className="checkbox__input" />
      <div className="checkbox__appearance">
        <div className="checkbox__icon icon" aria-hidden>
          <span>+</span>
        </div>
      </div>
      {props.children && (
        <div className="checkbox__label">{props.children}</div>
      )}
    </label>
  )
}

export default Checkbox
