import { HTMLAttributes } from "react"

import { Action } from "./client"
import { endpointTransform } from "./interceptors"


interface APIOuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href"> {
  action: Action
}

export function APIOuterLink(props: APIOuterLinkProps) {
  const href = endpointTransform(props.action)
  return (
    <a {...{ ...props, action: undefined }} href={href} />
  )
}
