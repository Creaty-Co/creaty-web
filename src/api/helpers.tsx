import { HTMLAttributes, useState } from "react"
import { useQuery } from "react-fetching-library"

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

interface APIDynamicOuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href"> {
  action: Action<{ link: string }>
}

export function APIDynamicOuterLink(props: APIDynamicOuterLinkProps) {
  const [init, setInit] = useState(false)
  const { error, loading, payload, query } = useQuery(props.action, init)
  if (error) throw new Error("useQuery error")

  if (!init) {
    return (
      <a {...{ ...props, action: undefined, href: undefined }} onClick={() => (setInit(true), query())}>
        <div className="button__text">Get link</div>
      </a>
    )
  }

  return (
    <a {...{ ...props, action: undefined }} href={payload?.link}>
      {loading && "Getting link..."}
      {!loading && !payload && "No content gotten"}
      {!loading && payload && props.children}
    </a>
  )
}
