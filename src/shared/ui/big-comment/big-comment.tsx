import "./big-comment.scss"

import { Icon } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode } from "react"

const CN = "big-comment"
const { getElement } = bem(CN)

export interface IBigComment {
  className?: string
  children: ReactNode
}

const toParagraphs = (text: string) => text.split("\n")
  .map((paragraph, index) => <p key={`paragraph-${index}`}>{paragraph}</p>)

export function BigComment({
  className,
  children
}: IBigComment) {

  const rChildren = typeof children === "string"
    ? toParagraphs(children) : children

  return (
    <div className={cn(CN, className)}>
      <div className={getElement("text")}>{rChildren}</div>
      <Icon className={getElement("icon")} name="star-union" />
    </div>
  )
}