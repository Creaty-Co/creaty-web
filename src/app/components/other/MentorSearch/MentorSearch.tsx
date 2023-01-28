import "./MentorSearch.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useClickAway from "hooks/useClickAway"
import { TopicType } from "interfaces/types"
import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectIsMobile } from "redux/reducers/device"
import { updateSearch } from "redux/reducers/search"
import { bem, classWithModifiers } from "utils/common"

import MentorSearchList from "./MentorSearchList"
import MentorSearchListItem from "./MentorSearchListItem"

const CN = "mentor-search"
const { getElement, getModifier } = bem(CN)

function MentorSearch() {  
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  const isMoblie = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device)) 
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  const search = useSelector<DefaultRootState, DefaultRootState["search"]>(state => state.search)
  console.log("rerender. search", search)

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

  const selectTopic = (id: string | null) => {
    if (id === null ) return null

    const topic = topics.list.find((topic) => topic.id === +id) || null
    if (topic) dispatch(updateSearch({ topic }))
  }

  const unselectTopic = (id: string | null) => {
    if (id === null ) return null
    const topic = topics.list.find((topic) => topic.id === +id) || null
    if (topic) dispatch(updateSearch({ topic: undefined }))
  }

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

    const isTopicRemove = targetHasAttr(target, "data-is-topic-remove")
    const isTopicAdd = targetHasAttr(target, "data-is-topic-add")
    const isClose = targetHasAttr(target, "data-is-close")
    const isInput = targetHasAttr(target, "data-is-input")

    /*
    */
    console.log("isInput", isInput)
    console.log("isClose", isClose)
    console.log("isTopicRemove", isTopicRemove)
    console.log("isTopicAdd", isTopicAdd)

    // TODO: fix to strong names
    if (isInput) focus()
    if (isClose) close()
    if (isTopicRemove) unselectTopic(target.getAttribute("data-topic-id"))
    if (isTopicAdd) selectTopic(target.getAttribute("data-topic-id"))
  }

  return (
    <div ref={containerRef}
      className={getModifier(CN,
        search.focused && "focused"
      )}

      onMouseDownCapture={onMouseDownHandler}
    >
      {/* Cover */}
      <div 
        className={getModifier(getElement("cover"), 
          search.focused && "active"
        )} 
      />

      {/* Search */}
      <div className={getElement("container")}>
        {/* Close. Mobile */}
        <div
          className={getModifier(getElement("wrapper"), "button")}
          data-is-close
        >
          <Icon name="arrow-left"
            className={getModifier(getElement("button"), "icon")}
            data-is-close
          />
        </div>

        <label ref={searchLabelRef}
          className={getModifier(getElement("search"), 
            search.focused && "focused",
            !search.focused && !!(search.tag || search.topic) && "filled"
          )}
          data-is-input
        >
          {/* Selected topic in search area */}
          {!search.focused && search.topic && (
            <MentorSearchListItem topic={search.topic} type="short" state="selected" />
          )}

          {/* Selected tags in search area */}
          {!search.focused && search.tag && (
            <TopicTag>{search.tag}</TopicTag>
          )}

          {/* Search Input */}
          {isInputVisible && (
            <>
              <input ref={inputRef} type="text"
                className={getModifier(getElement("input"), 
                  search.focused && "focused"
                )} 

                placeholder={t("placeholder")} 
                value={value} 
                data-is-input

                onChange={event => setValue(event.currentTarget.value)}
              />
              {
                value.length > 0 && 
                <Icon name="cross" className={getElement("icon")} />
              }
            </>
          )}
          {/* {onClick = { reset } } */}
          {/* DropDown List */}
          <MentorSearchList value={value} visible={search.focused} />
          {/* Icon */}
          <Icon name="chevron"
            className={getElement("icon")}
            modifiers={[search.focused && "up"]}
            data-is-input
          />
        </label>

        <NavLink to={"/mentors" + (search.topic && "/" + search.topic.shortcut || "")}
          className={getModifier(getElement("icon"),
            "search"
          )}
        >
          <Icon name="search" />
        </NavLink>

        <ButtonLink to={"/mentors" + (search.topic && "/" + search.topic.shortcut || "")}
          className={getElement("button-link")} 
          color="violet" 
          size="big" 
        >
          {t("button")}
        </ButtonLink>
      </div>
    </div>
  )
}

function targetHasAttr(target: HTMLElement, attrName: string): boolean {
  return target.hasAttribute(attrName) ||
    target.parentElement?.hasAttribute(attrName) || 
    false
}

export default MentorSearch
