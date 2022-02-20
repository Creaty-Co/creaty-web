import TopicTag from "app/components/UI/Tag/TopicTag"
import { TagType } from "interfaces/types"
import { useState } from "react"

interface MentorSearchTagsProps {
  tags: TagType[]
}

function MentorSearchTags(props: MentorSearchTagsProps) {
  const [innerWidth, setInnerWidth] = useState<number>()
  return (
    <div className="mentor-search__tags" style={{ "--inner-width": innerWidth }}>
      <div className="mentor-search__inner-tags" ref={el => setInnerWidth(el?.scrollWidth)}>
        {[...props.tags, ...props.tags].map(tag => (
          <TopicTag key={tag.id}>{tag}</TopicTag>
        ))}
      </div>
      <div className="mentor-search__shadow mentor-search__shadow--left" />
      <div className="mentor-search__shadow mentor-search__shadow--right" />
    </div>
  )
}

export default MentorSearchTags
