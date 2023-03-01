import "./big-comment.scss"

import Icon from "app/components/common/Icon/Icon"
import { ReactNode } from "react"


interface BigCommentProps {
  children: ReactNode
}

const toParagraphs = (text: string) => text.split("\n").map((paragraph, index) => <p key={`paragraph-${index}`}>{paragraph}</p>)

function BigComment(props: BigCommentProps) {
  const rChildren = typeof props.children === "string"
    ? toParagraphs(props.children) : props.children

  return (
    <div className="big-comment">
      <div className="big-comment__text">{rChildren}</div>
      <Icon className="big-comment__icon" name="star-union" />
    </div>
  )
}


export default BigComment
