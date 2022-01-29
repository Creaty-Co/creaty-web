import { HTMLAttributes } from "react"

import { Action } from "./client"


interface APIOuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href"> {
  action: Action
}

export function APIOuterLink(props: APIOuterLinkProps) {
  const href = process.env.REACT_APP_BASE_URL + props.action.endpoint + "/"
  return (
    <a {...{ ...props, action: undefined }} href={href} />
  )
}
