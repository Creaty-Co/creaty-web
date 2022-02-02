import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useLocalization from "modules/localization/hook"
import { ChangeEvent, Dispatch, useRef, useState } from "react"
import { classWithModifiers } from "utils/common"


const SCROLL_STEP = window.innerWidth / 500
const SCROLL_INTERVAL = 5

function MentorSearch() {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const intervalRef = useRef<NodeJS.Timer>()
  const tagsInnerRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState("")
  const [picks, setPicks] = useState<string[]>([])
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)
  }
  function onPick(pick: string) {
    setPicks([...picks, pick])
  }
  function onLeftShadowEnter() {
    intervalRef.current = setInterval(() => {
      if (!tagsInnerRef.current) return
      tagsInnerRef.current.scrollBy(-SCROLL_STEP, 0)
    }, SCROLL_INTERVAL)
  }
  function onRightShadowEnter() {
    intervalRef.current = setInterval(() => {
      if (!tagsInnerRef.current) return
      tagsInnerRef.current.scrollBy(SCROLL_STEP, 0)
    }, SCROLL_INTERVAL)
  }
  function onShadowBlur() {
    if (!intervalRef.current) return
    clearInterval(intervalRef.current)
  }
  return (
    <div className="mentor-search">
      <div className="mentor-search__container">
        <div className={classWithModifiers("mentor-search__search", !!value.length && "filled")}>
          {picks.map(pick => (
            <TopicTag key={pick}>{pick}</TopicTag>
          ))}
          <input type="text" placeholder={picks.length === 0 ? ll.placeholder : undefined} className="mentor-search__input" onChange={onChange} />
          <Icon name="chevron" className="mentor-search__icon" />
          <MentorSearchList searchValue={value} onChange={onPick} />
        </div>
        <Button color="violet" size="big">{ll.button}</Button>
      </div>
      <div className="mentor-search__tags">
        <div className="mentor-search__shadow mentor-search__shadow--left" onPointerEnter={onLeftShadowEnter} onPointerLeave={onShadowBlur} />
        <div className="mentor-search__shadow mentor-search__shadow--right" onPointerEnter={onRightShadowEnter} onPointerLeave={onShadowBlur} />
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
      </div>
    </div>
  )
}


interface MentorSearchListProps {
  searchValue: string
  onChange: Dispatch<string>
}

function MentorSearchList(props: MentorSearchListProps) {
  if (props.searchValue.length === 0) {
    return <MentorSearchStaticList onChange={props.onChange} />
  }
  return (
    <div className="mentor-search-list">
      <div className="mentor-search-list__container">
        <div className="mentor-search-list__item">Архитектура</div>
        <div className="mentor-search-list__item">Дизайн</div>
        <div className="mentor-search-list__item">Изобразительное искусство</div>
      </div>
    </div>
  )
}


function MentorSearchListItem(props: { name: string }) {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  return (
    <div className="mentor-search-list__item">
      <Icon className="mentor-search-list__icon" name={props.name} />
      <span>{ll.staticTopics[props.name]}</span>
    </div>
  )
}


interface MentorSearchStaticListProps {
  onChange: Dispatch<string>
}

function MentorSearchStaticList(props: MentorSearchStaticListProps) {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  return (
    <div className="mentor-search-list">
      <div className="mentor-search-list__container">
        {Object.keys(ll.staticTopics).map((topic, index) => (
          <button className="mentor-search-list__item" type="button" onClick={() => props.onChange(topic)} key={index}>{ll.staticTopics[topic]}</button>
        ))}
      </div>
      <div className="mentor-search-list__tags">
        <TopicTag>Дизайн интерьеров</TopicTag>
        <TopicTag>Дизайн архитектурной среды</TopicTag>
        <TopicTag>Архитетура малых форм</TopicTag>
        <TopicTag>BIM</TopicTag>
        <TopicTag>Ещё какой-то очень длинный тэг</TopicTag>
      </div>
    </div>
  )
}


export default MentorSearch
