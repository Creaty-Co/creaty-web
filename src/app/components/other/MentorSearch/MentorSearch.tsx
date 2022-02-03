import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useLocalization from "modules/localization/hook"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { SearchTag, SearchTopic, updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"


export const SCROLL_STEP = window.innerWidth / 500
export const SCROLL_INTERVAL = 5

interface MentorSearchProps {
  defaultValue?: string
}

function MentorSearch(props: MentorSearchProps) {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const [value, setValue] = useState(props.defaultValue || "")

  const searchRef = useRef<HTMLDivElement | null>(null)
  const focus = () => dispatch(updateSearch({ focused: true }))
  const blur = () => dispatch(updateSearch({ focused: false }))
  const reset = () => {
    setValue("")
    setTimeout(() => focus())
  }

  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      if (!searchRef.current) return
      if (searchRef.current.contains(event.target)) return

      blur()
    }

    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
  }, [])

  const isInputVisible = !(search.topic || search.tag)
  return (
    <div className="mentor-search">
      <div className={classWithModifiers("mentor-search__cover", search.focused && "active")} />
      <div className="mentor-search__container">
        <div className={classWithModifiers("mentor-search__search", search.focused && "focused")} onClick={focus} ref={searchRef}>
          {search.topic && (
            <div className="mentor-search-list__item mentor-search-list__item--active">
              <Icon name={search.topic.name} />
              <span>{search.topic.name}</span>
            </div>
          )}
          {search.tag && (
            <TopicTag>{search.tag}</TopicTag>
          )}

          {isInputVisible && (
            <input type="text" placeholder={ll.placeholder} className="mentor-search__input" value={value} onChange={event => setValue(event.currentTarget.value)} />
          )}
          {isInputVisible && value.length > 0 && (
            <Icon name="cross" className="mentor-search__icon" style={{ "--chars": value.length }} onClick={reset} />
          )}
          <MentorSearchList value={search.topic || search.tag ? null : value} visible={search.focused} />
          <Icon name="chevron" className="mentor-search__icon" />
        </div>
        <Button color="violet" size="big">{ll.button}</Button>
      </div>
    </div>
  )
}


interface MentorSearchListProps {
  value: string | null
  visible: boolean
}

function MentorSearchList(props: MentorSearchListProps) {
  if (props.value && props.value.length > 0) {
    return <MentorSearchListDynamic {...props} />
  }
  return <MentorSearchListStatic {...props} />
}


function MentorSearchListDynamic(props: MentorSearchListProps) {
  const [height, setHeight] = useState<number>()
  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")} style={{ "--height": height }} ref={element => setHeight(element?.offsetHeight)}>
      <div className="mentor-search-list__container">
        <div className="mentor-search-list__item">Архитектура</div>
        <div className="mentor-search-list__item">Дизайн</div>
        <div className="mentor-search-list__item">Изобразительное искусство</div>
      </div>
    </div>
  )
}


function MentorSearchListStatic(props: MentorSearchListProps) {
  const dispatch = useDispatch()
  const topics = useLocalization(ll => ll.other.topics)

  const updateTopic = (topic: SearchTopic) => setTimeout(() => dispatch(updateSearch({ topic, tag: undefined, focused: false })))
  const updateTag = (tag: SearchTag) => setTimeout(() => dispatch(updateSearch({ tag, focused: false })))
  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")}>
      <div className="mentor-search-list__container">
        {Object.keys(topics).map((topic, index) => (
          <Link className="mentor-search-list__item" to={"/mentors/" + topic} key={index} onClick={() => updateTopic({ id: 0, name: topic })}>
            <Icon name={topic} />
            <span>{topics[topic]}</span>
          </Link>
        ))}
      </div>
      <div className="mentor-search-list__tags">
        <Link className="topic-tag" to={`/mentors/${"design"}/`} onClick={() => updateTag({ id: 0, name: "design", text: "Дизайн интерьеров", topic: 0 })}>
          <span className="topic-tag__text">{"Дизайн интерьеров"}</span>
        </Link>
        <TopicTag>Дизайн архитектурной среды</TopicTag>
        <TopicTag>Архитетура малых форм</TopicTag>
        <TopicTag>BIM</TopicTag>
        <TopicTag>Ещё какой-то очень длинный тэг</TopicTag>
      </div>
    </div>
  )
}


export default MentorSearch
