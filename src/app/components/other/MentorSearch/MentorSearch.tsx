import "./MentorSearch.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"

import MentorSearchList from "./List/MentorSearchList"

function MentorSearch() {
  const dispatch = useDispatch()
  const search = useSelector<DefaultRootState, DefaultRootState["search"]>(state => state.search)

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

          {/* Topic Icon */}
          {!search.focused && search.topic && (
            <div className="mentor-search-list__item mentor-search-list__item--active">
              <Icon href={search.topic.icon} />
              <span>{search.topic.title}</span>
            </div>
          )}

          {/* Search Input */}
          {!search.focused && search.tag && (
            <TopicTag>{search.tag}</TopicTag>
          )}

          {/* Search Input */}
          {isInputVisible && (
            <>
              <input  
                className={classWithModifiers("mentor-search__input", search.focused && "focused")} 
                type="text"

                placeholder={t("placeholder")} 
                value={value} 

                onChange={event => setValue(event.currentTarget.value)}
              />
              {
                value.length > 0 && 
                <Icon name="cross" className="mentor-search__icon" onClick={reset} />
              }
            </>
          )}

          {/* DropDown List */}
          <MentorSearchList value={value} visible={search.focused} />

          <Icon name="chevron" className="mentor-search__icon" modifiers={[search.focused && "up"]} />
        </label>
        
        <ButtonLink color="violet" size="big" to="/mentors">{t("button")}</ButtonLink>
      </div>
    </div>
  )
}

export default MentorSearch
