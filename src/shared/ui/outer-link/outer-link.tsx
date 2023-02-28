import _ from "lodash"
import { HTMLAttributes } from "react"

export interface IOuterLink extends Omit<HTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  to: string
  eventLabel?: string
}

export function OuterLink(props: IOuterLink) {
  return <a {..._.omit(props, "eventLabel")} rel="noopener noreferrer" target="_blank" href={props.to} />
}
