import "./mentor-search-tag.scss"

import { Tag, TagType } from "@entities"
import { minFill } from "@shared/utils"
import { useEffect, useRef, useState } from "react"

interface MentorSearchTagsProps {
  tags: TagType[]
}

export function MentorSearchTags(props: MentorSearchTagsProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    (() => {
      const scrollWidth = innerRef.current?.scrollWidth
      const clientWidth = innerRef.current?.clientWidth
      const offsetWidth = innerRef.current?.offsetWidth
      const rectWidth = innerRef.current?.getBoundingClientRect().width
      // Safari compatibility
      setWidth(scrollWidth || clientWidth || offsetWidth || rectWidth || window.innerWidth || window.outerWidth || 2000)
    })()
  }, [props.tags])

  return (
    <div className="mentor-search__tags" style={{ "--inner-width": width }}>
      <div className="mentor-search__inner-tags" ref={innerRef}>
        {minFill(props.tags, 20).map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
      
      <div className="mentor-search__shadow mentor-search__shadow--left" />
      <div className="mentor-search__shadow mentor-search__shadow--right" />
    </div>
  )
}
