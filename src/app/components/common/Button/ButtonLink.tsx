import "./Button.scss"

import { MouseEventHandler } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { bem,classMerge, classWithModifiers } from "utils/common"

import { ButtonBaseProps } from "./Button.types"

interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  nav?: boolean
  end?: boolean
  disabled?: boolean
  replace?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>

  dataAttrs?: Record<string,string>
}

const CN = "button"
const { getElement, getModifier } = bem(CN)

function ButtonLink(props: ButtonLinkProps) {
  const location = useLocation()

  const modifiers: string[] = []
  if (props.color) modifiers.push(props.color)
  if (props.size) modifiers.push(props.size)
  if (props.outline) modifiers.push("outline")
  if (props.disabled) modifiers.push("disabled")
  
  return (
    <NavLink 
      className={link => classMerge(
        getModifier(CN, 
          ...modifiers,
          props.nav && link.isActive && "white"
        ),
        props.className
      )}

      replace={props.replace}
      to={props.disabled ? location : props.to}
      
      onClick={props.onClick} 
      end={props.end}

      {...props.dataAttrs}
    >
      {props.iconLeft && <div className={getElement("icon")} {...props.dataAttrs}>{props.iconLeft}</div>}
      <div className={getElement("text")} {...props.dataAttrs}>{props.children}</div>
      {props.iconRight && <div className={getElement("icon")} {...props.dataAttrs}>{props.iconRight}</div>}
    </NavLink>
  )
}

export default ButtonLink
