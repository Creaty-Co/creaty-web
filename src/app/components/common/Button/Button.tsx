// SCSS
import "./Button.scss"

import { MouseEventHandler, ReactNode } from "react"
import { classWithModifiers } from "utils/common"


interface ButtonProps {
  size?: "small" | "big"
  style?: "outline"
  color?: "green" | "violet"
  type?: "reset" | "submit"

  iconLeft?: ReactNode
  iconRight?: ReactNode

  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

function Button(props: ButtonProps) {
  return (
    <button className={classWithModifiers("button", props.style, props.size, props.color)} type={props.type || "button"} onClick={props.onClick}>
      <div className="button__icon">{props.iconLeft}</div>
      <div className="button__text">{props.children}</div>
      <div className="button__icon">{props.iconRight}</div>
    </button>
  )
}

export default Button
