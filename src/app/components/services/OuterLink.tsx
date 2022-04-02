import { HTMLAttributes } from "react"

interface OuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  to: string
  eventLabel: string
}

function OuterLink(props: OuterLinkProps) {
  return <a {...props} rel="noopener noreferrer" target="_blank" href={props.to} />
}


export default OuterLink
