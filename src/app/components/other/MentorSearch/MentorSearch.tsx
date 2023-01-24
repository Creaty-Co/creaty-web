import "./MentorSearch.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectIsMobile } from "redux/reducers/device"
import { updateSearch } from "redux/reducers/search"
import { classWithModifiers } from "utils/common"

import MentorSearchList from "./List/MentorSearchList"

function MentorSearch() {  
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  const isMoblie = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))
  const search = useSelector<DefaultRootState, DefaultRootState["search"]>(state => state.search)
  const dispatch = useDispatch()
  
  const [value, setValue] = useState("")
  
  const scrolledToRef = useRef<boolean>(search.focused)
  const scrolledFromRef = useRef<number>(0)

  const searchLabelRef = useRef<HTMLLabelElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const close = () => dispatch(updateSearch({ focused: false }))
  const focus = () => dispatch(updateSearch({ focused: true }))
  const blur = () => dispatch(updateSearch({ focused: false }))
  const reset = () => setValue("")

  useLayoutEffect(() => {
    if (search.focused && !scrolledToRef.current) {
      const scrollTo = containerRef.current?.getBoundingClientRect().top || 0
      const scrollDelay = isMoblie? 6 : 100

      scrolledFromRef.current = document.documentElement.scrollTop
      scrolledToRef.current = true

      document.body.style.overflow = "hidden"
      window.scrollTo({ top: document.documentElement.scrollTop + scrollTo - scrollDelay, behavior: "smooth" })
    }
    
    return () => {
      if (search.focused && scrolledToRef.current) {
        document.body.style.overflow = ""
        window.scrollTo({ top: scrolledFromRef.current, behavior: "smooth" })

        scrolledToRef.current = false
      }
    } 
  }, [search.focused])

  useEffect(reset, [search.tag, search.topic])
  useClickAway(searchLabelRef, blur)

  const isInputVisible = !(search.topic || search.tag) || search.focused

  const onMouseDownHandler = (event: MouseEvent<HTMLElement>) => {
    console.log("target: ", event.target)

    const target = event.target as HTMLElement
    const isInput = target.hasAttribute("data-is-input")
    const isClose = 
      target.hasAttribute("data-is-close") || 
      target.parentElement?.hasAttribute("data-is-close")

    console.log("isInput", isInput)
    console.log("isClose", isClose)

    if (isInput) focus()
    if (isClose) close()
  }

  return (
    <div 
      className={classWithModifiers(
        "mentor-search",
        search.focused && "focused"
      )}
      ref={containerRef}

      onMouseDownCapture={onMouseDownHandler}
    >
      <div className={classWithModifiers("mentor-search__cover", search.focused && "active")} />

      <div className="mentor-search__container">
        {/* Close. Mobile */}
        <div
          className="mentor-search__wrapper mentor-search__wrapper_button"
          data-is-close
        >
          <Icon
            data-is-close
            className="mentor-search__button_icon"
            name="arrow-left"
          />
        </div>

        <label 
          data-is-input
          className={classWithModifiers(
            "mentor-search__search", 
            search.focused && "focused", 
            !!(search.tag || search.topic) && "filled"
          )}
          ref={searchLabelRef}
        >

          {/* Topic Icon */}
          {!search.focused && search.topic && (
            <div className="mentor-search-list__item mentor-search-list__item--active">
              <Icon href={search.topic.icon} />
              <span>{search.topic.title}</span>
            </div>
          )}

          {/* Tags */}
          {!search.focused && search.tag && (
            <TopicTag>{search.tag}</TopicTag>
          )}

          {/* Search Input */}
          {isInputVisible && (
            <>
              <input
                ref={inputRef}
                data-is-input

                className={classWithModifiers("mentor-search__input", search.focused && "focused")} 
                type="text"

                placeholder={t("placeholder")} 
                value={value} 

                onChange={event => {
                  console.log("onchange", event.currentTarget.value)
                  setValue(event.currentTarget.value)
                }}
              />
              {
                value.length > 0 && 
                <Icon name="cross" className="mentor-search__icon" />
              }
            </>
          )}
          {/* {onClick = { reset } } */}
          {/* DropDown List */}
          <MentorSearchList value={value} visible={search.focused} />

          {/* Icon */}
          <Icon name="chevron" className="mentor-search__icon" modifiers={[search.focused && "up"]} />
        </label>
        
        <NavLink to="/mentors" className="mentor-search__icon-search">
          <Icon name="search" />
        </NavLink>

        <ButtonLink className="mentor-search__button-link" color="violet" size="big" to="/mentors">{t("button")}</ButtonLink>
      </div>
    </div>
  )
}

export default MentorSearch
