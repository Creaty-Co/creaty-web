import "./TopicTag.scss"

import { TagType } from "interfaces/types"
import { MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils/common"


interface TopicTagStringProps {
  noHash?: boolean
  children: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface TopicTagSearchTopicProps {
  noHash?: undefined
  children: TagType
  onClick?: undefined
}

function TopicTag(props: TopicTagStringProps | TopicTagSearchTopicProps) {
  if (typeof props.children === "string") {
    return (
      <button className={classWithModifiers("topic-tag", props.noHash && "no-hash")} type="button" onClick={props.onClick}>
        <span className="topic-tag__text">{props.children}</span>
      </button>
    )
  }
  return (
    <Link className="topic-tag" to={`/mentors/${props.children.shortcut}/`}>
      <span className="topic-tag__text">{props.children.title}</span>
    </Link>
  )
}


export default TopicTag
