import { HTMLAttributes } from "react"
import ReactGA from "react-ga"


interface OuterLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  to: string
  eventLabel: string
}

function OuterLink(props: OuterLinkProps) {
  return (
    <ReactGA.OutboundLink {...props} rel="noopener noreferrer" target="_blank" href={props.to} />
  )
  return <a {...props} rel="noopener noreferrer" target="_blank" href={props.to} />
}


export default OuterLink
