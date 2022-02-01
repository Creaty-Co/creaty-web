import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useLocalization from "modules/localization/hook"
import { ChangeEvent, Dispatch, useState } from "react"
import { classWithModifiers } from "utils/common"


function MentorSearch() {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const [value, setValue] = useState("")
  const [picks, setPicks] = useState<string[]>([])
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)
  }
  return (
    <div className="mentor-search">
      <div className="mentor-search__container">
        <label className={classWithModifiers("mentor-search__search", !!value.length && "filled")}>
          {picks.map(pick => (
            <TopicTag key={pick}>{pick}</TopicTag>
          ))}
          <input type="text" placeholder={picks.length === 0 ? ll.placeholder : undefined} className="mentor-search__input" onChange={onChange} />
          <Icon name="chevron" className="mentor-search__icon" />
          <MentorSearchList searchValue={value} onChange={pick => setPicks([...picks, pick])} />
        </label>
        <Button color="violet" size="big">{ll.button}</Button>
      </div>
      <div className="mentor-search__tags">
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


const staticTopicNames = ["architecture", "design", "art", "craft-jewellery", "games-animation", "movies-tv-photos", "fashion-design", "music-sound", "theater-scene-art", "digital-design", "art-management", "journalism-writing"]

interface MentorSearchStaticListProps {
  onChange: Dispatch<string>
}

function MentorSearchStaticList(props: MentorSearchStaticListProps) {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  return (
    <div className="mentor-search-list">
      <div className="mentor-search-list__container">
        {staticTopicNames.map((topic, index) => (
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
