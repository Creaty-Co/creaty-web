import "./TopicTag.scss"

import { TagType } from "interfaces/types"
import { MouseEventHandler } from "react"
import { NavLink } from "react-router-dom"
import { bem } from "utils/common"

const CN = "topic-tag"
const { getElement, getModifier } = bem(CN)

interface TopicTagStringProps {
  noHash?: boolean
  children: string
  onClick?: MouseEventHandler<HTMLElement>

  dataAttrs?: Record<string, boolean | string>
}

interface TopicTagSearchTopicProps {
  noHash?: undefined
  children: TagType
  onClick?: MouseEventHandler<HTMLElement>

  dataAttrs?: Record<string, boolean | string>
}

function TopicTag(props: TopicTagStringProps | TopicTagSearchTopicProps) {
  if (typeof props.children === "string") {
    return (
      <button type="button" 
        className={getModifier(CN,
          props.noHash && "no-hash"
        )}

        {...props.dataAttrs}
      >
        <span
          className={getElement("text")}
          {...props.dataAttrs}
        >
          {props.children}
        </span>
      </button>
    )
  }

  return (
    <NavLink to={`/mentors/${props.children.shortcut}/`}
      className={CN} 

      {...props.dataAttrs}
    >
      <span
        className={getElement("text")}
        {...props.dataAttrs}
      >{props.children.title}</span>
    </NavLink>
  )
}

export default TopicTag
