import "./Button.scss"

import { MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import { classMerge, classWithModifiers } from "utils/common"

import { ButtonBaseProps } from "./Button"


interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function ButtonLink(props: ButtonLinkProps) {
  return (
    <Link className={classMerge(classWithModifiers("button", props.style, props.size, props.color), props.className)} to={props.to} onClick={props.onClick}>
      <div className="button__icon">{props.iconLeft}</div>
      <div className="button__text">{props.children}</div>
      <div className="button__icon">{props.iconRight}</div>
    </Link>
  )
}


export default ButtonLink
