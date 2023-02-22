import "./Button.scss"

import LoaderCover from "app/components/UI/Loader/LoaderCover"
import { MouseEvent, MouseEventHandler, useState } from "react"
import ReactGA from "react-ga4"
import { classMerge, classWithModifiers } from "utils/common"

import { ButtonBaseProps } from "./Button.types"

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

  const modifiers: string[] = []
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)
  if (props.outline) modifiers.push("outline")
  if (pending || props.pending) modifiers.push("pending")

  return (
    <button className={classMerge(classWithModifiers("button", ...modifiers), props.className)} type={props.type || "button"} disabled={props.disabled || pending} onClick={onClick}>
      {props.iconLeft && (
        <div className="button__icon">{props.iconLeft}</div>
      )}
      <div className="button__text">{props.children}</div>
      {props.iconRight && (
        <div className="button__icon">{props.iconRight}</div>
      )}
      <div className="button__loader">
        <LoaderCover white />
      </div>
    </button>
  )
}

export default Button
