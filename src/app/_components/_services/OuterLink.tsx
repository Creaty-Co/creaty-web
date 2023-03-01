import _ from "lodash"
import { HTMLAttributes } from "react"

interface OuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  to: string
  eventLabel?: string
}

function OuterLink(props: OuterLinkProps) {
  return <a {..._.omit(props, "eventLabel")} rel="noopener noreferrer" target="_blank" href={props.to} />
}


export default OuterLink
