import "./TopicTag.scss"

import { classWithModifiers } from "utils/common"


interface TopicTagProps {
  noHash?: boolean
  children: string
}

function TopicTag(props: TopicTagProps) {
  return (
    <button className={classWithModifiers("topic-tag", props.noHash && "no-hash")} type="button">
      <span className="topic-tag__text">{props.children}</span>
    </button>
  )
}


export default TopicTag
