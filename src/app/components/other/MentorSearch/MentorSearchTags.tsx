import TopicTag from "app/components/UI/Tag/TopicTag"
import { TagType } from "interfaces/types"
import { useRef } from "react"


const SCROLL_STEP = window.innerWidth / 500
const SCROLL_INTERVAL = 5

interface MentorSearchTagsProps {
  tags: TagType[]
}

export default function MentorSearchTags(props: MentorSearchTagsProps) {
  const intervalRef = useRef<NodeJS.Timer>()
  const tagsInnerRef = useRef<HTMLDivElement | null>(null)
  function onLeftShadowEnter() {
    intervalRef.current = setInterval(() => {
      if (!tagsInnerRef.current)
        return
      tagsInnerRef.current.scrollBy(-SCROLL_STEP, 0)
    }, SCROLL_INTERVAL)
  }
  function onRightShadowEnter() {
    intervalRef.current = setInterval(() => {
      if (!tagsInnerRef.current)
        return
      tagsInnerRef.current.scrollBy(SCROLL_STEP, 0)
    }, SCROLL_INTERVAL)
  }
  function onShadowBlur() {
    if (!intervalRef.current)
      return
    clearInterval(intervalRef.current)
  }
  return (
    <div className="mentor-search__tags">
      <div className="mentor-search__inner-tags" ref={tagsInnerRef}>
        {props.tags.map(tag => (
          <TopicTag key={tag.id}>{tag}</TopicTag>
        ))}
      </div>
      <div className="mentor-search__shadow mentor-search__shadow--left" onPointerEnter={onLeftShadowEnter} onPointerLeave={onShadowBlur} />
      <div className="mentor-search__shadow mentor-search__shadow--right" onPointerEnter={onRightShadowEnter} onPointerLeave={onShadowBlur} />
    </div>
  )
}
