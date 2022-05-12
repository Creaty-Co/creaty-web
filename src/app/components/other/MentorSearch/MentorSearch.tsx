import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import useLocalization from "modules/localization/hook"
import { MouseEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"


function MentorSearch() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const [value, setValue] = useState("")

  const searchRef = useRef<HTMLLabelElement>(null)
  const focus = () => dispatch(updateSearch({ focused: true }))
  const blur = () => dispatch(updateSearch({ focused: false }))
  const reset = () => setValue("")

  useClickAway(searchRef, () => blur())

  const isInputVisible = !(search.topic || search.tag) || search.focused
  return (
    <div className="mentor-search">
      <div className={classWithModifiers("mentor-search__cover", search.focused && "active")} />
      <div className="mentor-search__container">
        <label className={classWithModifiers("mentor-search__search", search.focused && "focused", !!(search.tag || search.topic) && "filled")} onClick={focus} ref={searchRef}>
          {!search.focused && search.topic && (
            <div className="mentor-search-list__item mentor-search-list__item--active">
              <Icon href={search.topic.icon} />
              <span>{search.topic.title}</span>
            </div>
          )}
          {!search.focused && search.tag && (
            <TopicTag>{search.tag}</TopicTag>
          )}
          <input type="text" placeholder={isInputVisible ? ll.placeholder : undefined} className="mentor-search__input" value={value} onChange={event => setValue(event.currentTarget.value)} />
          {isInputVisible && value.length > 0 && (
            <Icon name="cross" className="mentor-search__icon" onClick={reset} />
          )}
          <MentorSearchList value={value} visible={search.focused} />
          <Icon name="chevron" className="mentor-search__icon" modifiers={[search.focused && "up"]} />
        </label>
        <Button color="violet" size="big" eventLabel="Search Form">{ll.button}</Button>
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
    return <MentorSearchListDynamic {...props} value={props.value} />
  }
  return <MentorSearchListStatic />
}


function MentorSearchListDynamic(props: MentorSearchListProps & { value: string }) {
  const topics = useSelector(state => state.topics)

  const searchLowerCaseValue = props.value.toLowerCase()
  const findSearchValueEntry = (value: string) => value.toLowerCase().search(searchLowerCaseValue)

  const SearchTagEntries =
    topics.tags
      .map(tag => ({ tag, index: findSearchValueEntry(tag.title) }))
      .filter(occur => occur.index >= 0)
  // const SearchTopicEntries =
  //   topics.list
  //     .map(topic => ({ topic, index: findSearchValueEntry(topic.title) }))
  //     .filter(entry => entry.index >= 0)
  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")}>
      <div className="mentor-search-list__container">
        {SearchTagEntries.map(entry => (
          <Link className="mentor-search-list__item" to={"/mentors/" + entry.tag.shortcut} key={entry.tag.id}>
            <span>
              {entry.tag.title.slice(0, entry.index)}
              <em>{entry.tag.title.slice(entry.index, entry.index + props.value.length)}</em>
              {entry.tag.title.slice(entry.index + props.value.length)}
            </span>
          </Link>
        ))}
        {SearchTagEntries.length === 0 && (
          <div className="mentor-search-list__item">По вашему запросу ничего не найдено.</div>
        )}
      </div>
    </div>
  )
}


function MentorSearchListStatic() {
  const dispatch = useDispatch()

  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const topics = useSelector(state => state.topics)
  const search = useSelector(state => state.search)

  function collapseSearchList(event: MouseEvent) {
    // stop propagation of `MentorSearch Blur` callback
    event.stopPropagation()
    dispatch(updateSearch({ focused: false }))
  }

  const [cursorTopic, setCursorTopic] = useState(search.topic)
  const topic = cursorTopic || search.topic
  return (
    <div className={classWithModifiers("mentor-search-list", search.focused && "visible")} onPointerLeave={() => setCursorTopic(search.topic)}>
      <div className="mentor-search-list__container">
        {topics.list.map(topic => (
          <Link
            className={classWithModifiers("mentor-search-list__item", !search.tag && topic.id === search.topic?.id && "active")}
            to={"/mentors/" + topic.shortcut}
            onPointerEnter={() => setCursorTopic(topic)}
            key={topic.id}
          >
            <Icon href={topic.icon} />
            <span>{topic.title}</span>
          </Link>
        ))}
      </div>
      <div className="mentor-search-list__tags">
        {topic?.tags.map(tag => (
          <TopicTag onClick={collapseSearchList} key={tag.id}>{tag}</TopicTag>
        ))}
        {topic == null && (
          <div className="mentor-search-list-empty">
            <Icon className="mentor-search-list-empty__icon" name="touch" />
            <span className="mentor-search-list-empty__text">{ll.chooseTopic}</span>
          </div>
        )}
      </div>
    </div>
  )
}


export default MentorSearch
