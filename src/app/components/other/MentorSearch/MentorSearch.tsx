import "./MentorSearch.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import { TopicType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { useRef, useState } from "react"
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

  const isInputVisible = !(search.topic || search.tag)
  return (
    <div className="mentor-search">
      <div className={classWithModifiers("mentor-search__cover", search.focused && "active")} />
      <div className="mentor-search__container">
        <label className={classWithModifiers("mentor-search__search", search.focused && "focused")} onClick={focus} ref={searchRef}>
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
            <Icon name="cross" className="mentor-search__icon" onClick={reset} />
          )}
          <MentorSearchList value={search.topic || search.tag ? null : value} visible={search.focused} />
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

  const searchEntries =
    topics.tags
      .map(tag => ({ tag, index: findSearchValueEntry(tag.title) }))
      .filter(occur => occur.index >= 0)
  return (
    <div className={classWithModifiers("mentor-search-list", props.visible && "visible")}>
      <div className="mentor-search-list__container">
        {searchEntries.map(occur => (
          <Link className="mentor-search-list__item" to={"/mentors/" + occur.tag.shortcut} key={occur.tag.id}>
            <span>
              {occur.tag.title.slice(0, occur.index)}
              <em>{occur.tag.title.slice(occur.index, occur.index + props.value.length)}</em>
              {occur.tag.title.slice(occur.index + props.value.length)}
            </span>
          </Link>
        ))}
        {searchEntries.length === 0 && (
          <div className="mentor-search-list__item">По вашему запросу ничего не найдено.</div>
        )}
      </div>
    </div>
  )
}


function MentorSearchListStatic() {
  const ll = useLocalization(ll => ll.views.home.mentorSearch)
  const topics = useSelector(state => state.topics)
  const search = useSelector(state => state.search)

  const dispatch = useDispatch()
  const onTopicHover = (topic: TopicType) => dispatch(updateSearch({ topic }))
  return (
    <div className={classWithModifiers("mentor-search-list", search.focused && "visible")}>
      <div className="mentor-search-list__container">
        {topics.list.map(topic => (
          <Link className="mentor-search-list__item" to={"/mentors/" + topic.shortcut} key={topic.id} onPointerEnter={() => onTopicHover(topic)}>
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
