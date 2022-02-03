import "./TopicTag.scss"

import useLocalization from "modules/localization/hook"
import { MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import { SearchTag } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"


interface TopicTagStringProps {
  noHash?: boolean
  children: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface TopicTagSearchTopicProps {
  noHash?: undefined
  children: SearchTag
  onClick?: undefined
}

function TopicTag(props: TopicTagStringProps | TopicTagSearchTopicProps) {
  const tags = useLocalization(ll => ll.other.tags)
  if (typeof props.children === "string") {
    return (
      <button className={classWithModifiers("topic-tag", props.noHash && "no-hash")} type="button" onClick={props.onClick}>
        <span className="topic-tag__text">{props.children}</span>
      </button>
    )
  }
  return (
    <Link className="topic-tag" to={`/mentors/${props.children.name}/`}>
      <span className="topic-tag__text">{tags[props.children.name] || props.children.name}</span>
    </Link>
  )
}


export default TopicTag
