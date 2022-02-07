import TopicTag from "app/components/UI/Tag/TopicTag"
import { useRef } from "react"

import { SCROLL_INTERVAL, SCROLL_STEP } from "./MentorSearch"


export default function MentorSearchTags() {
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
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
        <TopicTag>Иллюстрация</TopicTag>
        <TopicTag>Архитектура</TopicTag>
        <TopicTag>Графический дизайн</TopicTag>
        <TopicTag>Fashion дизайн</TopicTag>
        <TopicTag>UX/UI</TopicTag>
      </div>
      <div className="mentor-search__shadow mentor-search__shadow--left" onPointerEnter={onLeftShadowEnter} onPointerLeave={onShadowBlur} />
      <div className="mentor-search__shadow mentor-search__shadow--right" onPointerEnter={onRightShadowEnter} onPointerLeave={onShadowBlur} />
    </div>
  )
}
