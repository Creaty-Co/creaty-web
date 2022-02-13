import "./Button.scss"

import { MouseEvent, MouseEventHandler, ReactNode } from "react"
import ReactGA from "react-ga"
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
  eventLabel?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
  function onClick(event: MouseEvent<HTMLButtonElement>) {
    props.onClick?.(event)
    /* --- Google Analytics --- */
    if (props.eventLabel) {
      ReactGA.event({
        category: "User",
        action: "Clicked Button",
        label: props.eventLabel
      })
    }
  }
  return (
    <button className={classMerge(classWithModifiers("button", props.style, props.size, props.color), props.className)} type={props.type || "button"} disabled={props.disabled} onClick={onClick}>
      <div className="button__icon">{props.iconLeft}</div>
      <div className="button__text">{props.children}</div>
      <div className="button__icon">{props.iconRight}</div>
    </button>
  )
}


export default Button
