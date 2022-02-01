import "./Button.scss"

import { MouseEventHandler, ReactNode } from "react"
import { classMerge, classWithModifiers } from "utils/common"


export interface ButtonBaseProps {
  size?: "small" | "big"
  style?: "outline"
  color?: "white" | "dark" | "green" | "violet"

  className?: string

  iconLeft?: ReactNode
  iconRight?: ReactNode

  children: ReactNode
}

interface ButtonProps extends ButtonBaseProps {
  type?: "reset" | "submit"
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
  return (
    <button className={classMerge(classWithModifiers("button", props.style, props.size, props.color), props.className)} type={props.type || "button"} onClick={props.onClick}>
      <div className="button__icon">{props.iconLeft}</div>
      <div className="button__text">{props.children}</div>
      <div className="button__icon">{props.iconRight}</div>
    </button>
  )
}


export default Button
