import "./TagsLine.scss"

import { Tag } from "@components/Tag/Tag"
import { bem } from "@shared/utils/common"
import { ITag } from "@store/tags/tags.types"
import cn from "classnames"
import { useEffect, useRef, useState } from "react"

const CN = "tags-line"
const { getElement, getModifier } = bem(CN)

export function minFill<T>(array: T[], minLevel?: number): T[] {
  if (array.length === 0) return array
  if (minLevel == null || array.length >= minLevel) {
    return array
  }

  const newArray: T[] = []
  while (newArray.length < minLevel) {
    newArray.push(...array)
  }
  return newArray
}

interface ITagsLineProps {
  tags: ITag[]
}
export function TagsLine({ tags }: ITagsLineProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    ;(() => {
      const scrollWidth = innerRef.current?.scrollWidth
      const clientWidth = innerRef.current?.clientWidth
      const offsetWidth = innerRef.current?.offsetWidth
      const rectWidth = innerRef.current?.getBoundingClientRect().width
      // Safari compatibility
      setWidth(scrollWidth || clientWidth || offsetWidth || rectWidth || window.innerWidth || window.outerWidth || 2000)
    })()
  }, [tags])

  return (
    <div className={getElement("wrapper")} style={{ "--inner-width": width }}>
      <div className={getElement("inner-tags")} ref={innerRef}>
        {minFill(tags, 20).map((tag, i) => (
          <Tag key={i + tag.shortcut} {...tag} />
        ))}
      </div>

      <div className={cn(getElement("shadow"), getModifier(getElement("shadow"), "left"))} />
      <div className={cn(getElement("shadow"), getModifier(getElement("shadow"), "right"))} />
    </div>
  )
}
