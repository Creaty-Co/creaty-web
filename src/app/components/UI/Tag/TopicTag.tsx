import "./TopicTag.scss"

import { ReactNode } from "react"


interface TopicTagProps {
  disabled?: boolean
  children: ReactNode
}

function TopicTag(props: TopicTagProps) {
  return (
    <button className="topic-tag" {...props} type="button" />
  )
}


export default TopicTag
