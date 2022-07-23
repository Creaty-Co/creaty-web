import "./Button.scss"

import LoaderCover from "app/components/UI/Loader/LoaderCover"
import { MouseEvent, MouseEventHandler, useState } from "react"
import ReactGA from "react-ga4"
import { classMerge, classWithModifiers } from "utils/common"

import Icon, { IconName } from "../Icon/Icon"
import { ButtonBaseProps } from "./Button.types"

interface ButtonIconProps extends Omit<ButtonBaseProps, "iconLeft" | "iconRight" | "children"> {
  type?: "reset" | "submit"
  eventLabel?: string
  name?: IconName
  disabled?: boolean
  await?: boolean
  pending?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function ButtonIcon(props: ButtonIconProps) {
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
  // Defines that this is icon-only button (button with only icon as `children`)
  modifiers.push("icon-only")
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)
  if (props.outline) modifiers.push("outline")
  if (pending || props.pending) modifiers.push("pending")

  return (
    <button className={classMerge(classWithModifiers("button", ...modifiers), props.className)} type={props.type || "button"} disabled={props.disabled || pending} onClick={onClick}>
      {/* Pass size to `button__icon` so now it controls the padding by itself */}
      <div className={classWithModifiers("button__icon", props.size)}>
        <Icon name={props.name} />
      </div>
      <div className="button__loader">
        <LoaderCover white />
      </div>
    </button>
  )
}

export default ButtonIcon
