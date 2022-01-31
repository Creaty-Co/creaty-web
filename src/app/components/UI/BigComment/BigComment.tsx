import "./BigComment.scss"

import Icon from "app/components/common/Icon/Icon"
import { ReactNode } from "react"


interface BigCommentProps {
  children: ReactNode
}

function BigComment(props: BigCommentProps) {
  return (
    <div className="big-comment">
      <div className="big-comment__text">{props.children}</div>
      <Icon className="big-comment__icon" name="star-union" />
    </div>
  )
}


export default BigComment
