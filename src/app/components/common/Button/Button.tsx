import "./Button.scss"

import { MouseEvent, MouseEventHandler, ReactNode, useState } from "react"
import ReactGA from "react-ga4"
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
  await?: boolean
  pending?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>

}

function Button(props: ButtonProps) {
  const [pending, setPending] = useState(false)
  async function onClick(event: MouseEvent<HTMLButtonElement>) {
    if (props.await) {
      setPending(true)
      await props.onClick?.(event)
      setPending(false)
    } else {
      props.onClick?.(event)
    }
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
    <button className={classMerge(classWithModifiers("button", props.style, props.size, props.color), props.className)} type={props.type || "button"} disabled={props.disabled || pending || props.pending} onClick={onClick}>
      <div className="button__icon">{props.iconLeft}</div>
      <div className="button__text">{(pending || props.pending) ? "Loading..." : props.children}</div>
      <div className="button__icon">{props.iconRight}</div>
    </button>
  )
}


export default Button
