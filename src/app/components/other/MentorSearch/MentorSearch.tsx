import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import useLocalization from "modules/localization/hook"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"


function MentorSearch() {
  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const search = useSelector(state => state.search)

  const isNoTopics = topics.list.length === 0

  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const [value, setValue] = useState("")

  const searchRef = useRef<HTMLButtonElement | null>(null)
  const focus = () => dispatch(updateSearch({ focused: true }))
  const blur = () => dispatch(updateSearch({ focused: false }))
  const reset = () => setValue("")

  useClickAway(searchRef, () => blur())

  const isInputVisible = !(search.topic || search.tag)
  return (
    <div className="mentor-search">
      <div className={classWithModifiers("mentor-search__cover", search.focused && "active")} />
      <div className="mentor-search__container">
        <button className={classWithModifiers("mentor-search__search", search.focused && "focused")} disabled={isNoTopics} onClick={focus} ref={searchRef}>
          {search.topic && (
            <div className="mentor-search-list__item mentor-search-list__item--active">
              <Icon name={search.topic.shortcut} />
              <span>{search.topic.title}</span>
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
        </button>
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
  return <MentorSearchListStatic />
}


function MentorSearchListDynamic(props: MentorSearchListProps) {
  const topics = useSelector(state => state.topics)
  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")}>
      <div className="mentor-search-list__container">
        {topics.tags.map(tag => {
          if (props.value == null) {
            return (
              <Link className="mentor-search-list__item" to={"/mentors/" + tag.shortcut} key={tag.id}>
                {tag.title}
              </Link>
            )
          }

          const searchIndex = tag.title.toLowerCase().search(props.value.toLowerCase())
          if (searchIndex < 0) return null

          return (
            <Link className="mentor-search-list__item" to={"/mentors/" + tag.shortcut} key={tag.id}>
              <span>
                {tag.title.slice(0, searchIndex)}
                <em>{tag.title.slice(searchIndex, searchIndex + props.value.length)}</em>
                {tag.title.slice(searchIndex + props.value.length)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


function MentorSearchListStatic() {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const topics = useSelector(state => state.topics)
  const search = useSelector(state => state.search)
  return (
    <div className={classWithModifiers("mentor-search-list", search.focused && "visible")}>
      <div className="mentor-search-list__container">
        {topics.list.map((topic, index) => (
          <Link className="mentor-search-list__item" to={"/mentors/" + topic.shortcut} key={index}>
            <Icon name={topic.shortcut} />
            <span>{topic.title}</span>
          </Link>
        ))}
      </div>
      <div className="mentor-search-list__tags">
        {!search.tag && search.topic?.tags.map(tag => (
          <Link className="topic-tag" to={`/mentors/${tag.shortcut}/`} key={tag.id}>
            <span className="topic-tag__text">{tag.title}</span>
          </Link>
        ))}
        {(!search.topic || !!search.tag) && (
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
