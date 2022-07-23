import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"


function MentorSearch() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
  const [value, setValue] = useState("")

  const searchRef = useRef<HTMLLabelElement>(null)
  const focus = () => dispatch(updateSearch({ focused: true }))
  const blur = () => dispatch(updateSearch({ focused: false }))
  const reset = () => setValue("")

  useEffect(reset, [search.tag, search.topic])
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
          {isInputVisible && (
            <>
              <input type="text" placeholder={t("placeholder")} className={classWithModifiers("mentor-search__input", search.focused && "focused")} value={value} onChange={event => setValue(event.currentTarget.value)} />
              {
                value.length > 0 && (
                  <Icon name="cross" className="mentor-search__icon" onClick={reset} />
                )
              }
            </>
          )}
          <MentorSearchList value={value} visible={search.focused} />
          <Icon name="chevron" className="mentor-search__icon" modifiers={[search.focused && "up"]} />
        </label>
        <Button color="violet" size="big" eventLabel="Search Form">{t("button")}</Button>
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
  const dispatch = useDispatch()

  function collapseSearchList(event: MouseEvent) {
    // stop propagation of `MentorSearch Blur` callback
    event.stopPropagation()

    dispatch(updateSearch({ focused: false }))
  }


  const topics = useSelector(state => state.topics)

  const searchLowerCaseValue = props.value.toLowerCase()
  const findSearchValueEntry = (value: string) => value.toLowerCase().search(searchLowerCaseValue)

  const SearchTagEntries =
    topics.tags
      .map(tag => ({ tag, index: findSearchValueEntry(tag.title) }))
      .filter(occur => occur.index >= 0)
  const SearchTopicEntries =
    topics.list
      .map(topic => ({ topic, index: findSearchValueEntry(topic.title) }))
      .filter(entry => entry.index >= 0)

  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")}>
      <div className="mentor-search-list__container">
        {SearchTopicEntries.map(entry => (
          <Link className="mentor-search-list__item" to={"/mentors/" + entry.topic.shortcut} onClick={collapseSearchList} key={entry.topic.id}>
            <span>
              {entry.topic.title.slice(0, entry.index)}
              <em>{entry.topic.title.slice(entry.index, entry.index + props.value.length)}</em>
              {entry.topic.title.slice(entry.index + props.value.length)}
            </span>
          </Link>
        ))}
        {SearchTagEntries.map(entry => (
          <Link className="mentor-search-list__item" to={"/mentors/" + entry.tag.shortcut} onClick={collapseSearchList} key={entry.tag.id}>
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

  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
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
            onClick={collapseSearchList}
            key={topic.id}
          >
            <Icon href={topic.icon} />
            <span>{topic.title}</span>
          </Link>
        ))}
        {topics.list.length === 0 && (
          <LoaderCover />
        )}
      </div>
      <div className="mentor-search-list__tags">
        {topic?.tags.map(tag => (
          <TopicTag onClick={collapseSearchList} key={tag.id}>{tag}</TopicTag>
        ))}
        {topic == null && (
          <div className="mentor-search-list-empty">
            <Icon className="mentor-search-list-empty__icon" name="touch" />
            <span className="mentor-search-list-empty__text">{t("chooseTopic")}</span>
          </div>
        )}
      </div>
    </div>
  )
}


export default MentorSearch
