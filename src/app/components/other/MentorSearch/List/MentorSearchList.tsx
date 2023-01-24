import "./MentorSearchList.scss"

import Icon from "app/components/common/Icon/Icon"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import TopicTag from "app/components/UI/Tag/TopicTag"
import { MouseEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectIsMobile } from "redux/reducers/device"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"

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

function MentorSearchListStatic() {
  const dispatch = useDispatch()

  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  const isMobile = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  const search = useSelector<DefaultRootState, DefaultRootState["search"]>(state => state.search)
  
  function collapseSearchList(event: MouseEvent) {
    // stop propagation of `MentorSearch Blur` callback
    event.preventDefault()
    event.stopPropagation()
    dispatch(updateSearch({ focused: false }))
  }

  const handleLinkClick = (event: MouseEvent) => {
    console.log("handleLinkClick")
    if (isMobile) event.preventDefault()
  }

  const [cursorTopic, setCursorTopic] = useState(search.topic)
  const topic = cursorTopic || search.topic

  return (
    <div
      className={classWithModifiers("mentor-search-list", search.focused && "visible")} 
      onPointerLeave={() => setCursorTopic(search.topic)}
    >

      <div className="mentor-search-list__container">

        {topics.list.map(topic => (
          <Link key={topic.id}
            className={classWithModifiers(
              "mentor-search-list__item", 
              !search.tag && topic.id === search.topic?.id && "active"
            )}

            to={"/mentors/" + topic.shortcut}

            onPointerEnter={() => setCursorTopic(topic)}
            onClick={handleLinkClick}
          >
            <Icon href={topic.icon} />
            <span>{topic.title}</span>

            <div className="mentor-search-list__icon-item">
              <Icon name="chevron" />
            </div>
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
          <div className="mentor-search-list_empty">
            <Icon className="mentor-search-list__icon" name="touch" />
            <span className="mentor-search-list__text">{t("chooseTopic")}</span>
          </div>
        )}
      </div>

    </div>
  )
}

function MentorSearchListDynamic(props: MentorSearchListProps & { value: string }) {
  const dispatch = useDispatch()

  function collapseSearchList(event: MouseEvent) {
    // stop propagation of `MentorSearch Blur` callback
    event.stopPropagation()

    dispatch(updateSearch({ focused: false }))
  }

  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)

  const searchLowerCaseValue = props.value.toLowerCase()
  const findSearchValueEntry = (value: string) => value.toLowerCase().search(searchLowerCaseValue)

  const SearchTagEntries = topics.tags
    .map(tag => ({ tag, index: findSearchValueEntry(tag.title) }))
    .filter(occur => occur.index >= 0)
  const SearchTopicEntries = topics.list
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

export default MentorSearchList