import TopicTag from "app/components/UI/Tag/TopicTag"
import { TagType } from "interfaces/types"
import { useRef } from "react"

interface MentorSearchTagsProps {
  tags: TagType[]
}

function MentorSearchTags(props: MentorSearchTagsProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  return (
    <div className="mentor-search__tags" style={{ "--inner-width": innerRef.current?.scrollWidth }}>
      <div className="mentor-search__inner-tags" ref={innerRef}>
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
