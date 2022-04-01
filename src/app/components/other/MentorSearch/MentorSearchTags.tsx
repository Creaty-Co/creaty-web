import "./MentorSearch.scss"

import TopicTag from "app/components/UI/Tag/TopicTag"
import { TagType } from "interfaces/types"
import { useEffect, useRef, useState } from "react"

interface MentorSearchTagsProps {
  tags: TagType[]
}

function MentorSearchTags(props: MentorSearchTagsProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()
  useEffect(() => setWidth(innerRef.current?.scrollWidth), [props.tags])
  return (
    <div className="mentor-search__tags" style={{ "--inner-width": width }}>
      <div className="mentor-search__inner-tags" ref={innerRef}>
        {[...props.tags, ...props.tags].map((tag, index) => (
          <TopicTag key={index}>{tag}</TopicTag>
        ))}
      </div>
      <div className="mentor-search__shadow mentor-search__shadow--left" />
      <div className="mentor-search__shadow mentor-search__shadow--right" />
    </div>
  )
}

export default MentorSearchTags
