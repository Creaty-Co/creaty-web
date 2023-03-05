import "./mentor-search.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { CategoryType, selectTopics, Tag } from "@entities"
import { selectIsMobile } from "@entities/device"
import { ISearchState, selectSearch, updateSearch } from "@features"
import { ButtonLink, Icon } from "@shared/ui"
import { bem, targetGetAttr, toDataAttrs, togglerTransformAction } from "@shared/utils"
import { MouseEvent as SMouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useNavigate } from "react-router-dom"

import { MentorSearchList } from "./mentor-search-list"
import { MentorSearchListItem } from "./mentor-search-list-item"

/* Selectors type */ 
const SELECTORS = ["topic", "tag"] as const
type SelectorsTuple = typeof SELECTORS;
type Selectors = SelectorsTuple[number];
const isSelector = (selector: string): selector is Selectors => SELECTORS.includes(selector as Selectors)

/* BEM */ 
const CN = "mentor-search"
const { getElement, getModifier } = bem(CN)

export function MentorSearch() {  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  /* Get data from store */ 
  const searchStore = useAppSelector(selectSearch)
  const isMoblie = useAppSelector(selectIsMobile) 
  const topics = useAppSelector(selectTopics)
  
  /* Local search state */ 
  const [searchState, setSearchState] = useState<ISearchState>({ ...searchStore })
  useEffect(() => setSearchState({...searchStore}), [searchStore.topic, searchStore.tag])

  /* Compare state and store */
  const pureSearch = 
    searchState.topic === searchStore.topic && 
    searchState.tag === searchStore.tag &&
    searchState.tag !== undefined

  /* Searching in topics and tags */
  const [value, setValue] = useState("")
  useEffect(() => setValue(""), [searchState.topic, searchState.tag])

  /* For what??? */ 
  const selectedRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Close on click out of search */
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchLabelRef = useRef<HTMLLabelElement>(null)
  const cbClicAway = useCallback(listener, [searchState.focused])
  useLayoutEffect(clickAway, [searchState.focused])

  /* Scroll controll */
  const scrolledFromRef = useRef<number>(0)
  const scrolledToRef = useRef<boolean>(searchState.focused)
  const containerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(focusedScroll, [searchState.focused])

  /* Routes */ 
  const redirectTo = "/mentors" + (
    (searchState.topic && !searchState.tag && "/" + searchState.topic.shortcut) ||
    (!searchState.topic && searchState.tag && "/" + searchState.tag.shortcut) || 
    (searchState.topic && searchState.tag && "/" + searchState.tag.shortcut) || "")

  return (
    <div ref={containerRef}
      className={getModifier(CN,
        searchState.focused && "focused"
      )}

      onMouseDownCapture={onMouseDownHandler}
    >
      {/* Cover */}
      <div 
        className={getModifier(getElement("cover"), 
          searchState.focused && "active"
        )} 
      />

      {/* Search */}
      <div ref={searchContainerRef}
        className={getElement("container")}
      >
        {/* Close. Mobile */}
        <div
          className={getModifier(getElement("wrapper"), "button")}
          data-action="input/close"
        >
          <Icon name="arrow-left"
            className={getModifier(getElement("button"), "icon")}
            data-action="input/close"
          />
        </div>

        <label ref={searchLabelRef}
          className={getModifier(getElement("search"), 
            searchState.focused && "focused",
            !searchState.focused && !!(searchState.tag || searchState.topic) && "filled"
          )}
          data-action="input/focus"
        >
          {/* If selected */}
          {!searchState.focused && (searchState.topic || searchState.tag) && 
            <div ref={selectedRef}
              className={getElement("selected")}

              data-action="input/focus"
            >
              {/* Selected topic in search area */}
              {searchState.topic &&
                <MentorSearchListItem
                  topic={searchState.topic}
                  state="selected"
                  type="short"

                  dataAttrs={toDataAttrs({
                    "action": "input/focus" 
                  })}
                />
              }

              {/* Selected tags in search area */}
              {!searchState.focused && searchState.tag &&
                <Tag
                  dataAttrs={toDataAttrs({
                    "action": "input/focus" 
                  })}
                >{searchState.tag}</Tag>
              }
            </div>
          }

          {/* Search Input */}
          {(!(searchState.topic || searchState.tag) || searchState.focused) &&
            <>
              {/* Searching input */}
              <input ref={inputRef} type="text"
                className={getModifier(getElement("input"), 
                  searchState.focused && "focused"
                )} 

                placeholder={t("placeholder")} 
                value={value} 
                
                onChange={event => setValue(event.currentTarget.value)}
                data-action="input/focus"
              />

              {/* Clear search field */}
              {value.length > 0 && 
                <Icon name="cross" 
                  className={getElement("icon")}
                  onClick={() => setValue("")}
                />
              }
            </>
          }
          
          {/* Mentros' list */}
          <MentorSearchList
            searchState={searchState}
            pureSearch={pureSearch}
            topics={topics}
            value={value}
          />

          {/* Icon dropdown */}
          <Icon name="chevron"
            className={getElement("icon")}
            modifiers={[searchState.focused && "up"]}
            data-action="input/focus"
          />
        </label>

        <NavLink to={redirectTo}
          className={getModifier(getElement("icon"),
            "search"
          )}
          data-action="search"
        >
          <Icon name="search" data-action="search"/>
        </NavLink>

        <ButtonLink to={redirectTo}
          className={getElement("button-link")} 
          color="violet" 
          size="big" 

          dataAttrs={toDataAttrs({
            "action": "search"
          })}
        >
          {t("button")}
        </ButtonLink>
      </div>
    </div>
  )

  /* Functions */ 
  function toggle(name: string | boolean, id: number | string | null | undefined, forceTo?: boolean | null): void {
    if (id === null || id === undefined) return
    if (typeof name === "boolean" || !isSelector(name)) return

    const values = name === "topic" ? topics.list : topics.tags
    const value = values.find(value => value.id === +id)

    if (value) setSearchState(prevState => {
      const to = forceTo === undefined || forceTo === null
        ? prevState[name]?.id !== id
        : forceTo

      const duoSearch = { [name]: to ? value : undefined }
      /* Turn off tag connected with topic */ 
      if (name === "topic" && !to) duoSearch.tag = undefined

      /*
        If topic was turned on and We have some tag 
        We need to check according tag to topic
      */
      if (
        name === "topic" && to && searchState.tag && 
        !(value as CategoryType).tags.find(tag => tag.id === searchState.tag?.id)
      ) duoSearch.tag = undefined

      if (
        name === "tag" && to && searchState.topic &&
        !searchState.topic.tags.find(tag => tag.id === value.id)
      ) duoSearch.topic = undefined

      return { ...prevState, ...duoSearch }
    })
  }

  function getURLByTagID(ID: number): string {
    const url = ["mentors"]
    const tag = topics.tags.find(tag => tag.id === ID)

    /*
    const tagInCategory = !!searchState.topic?.tags.find(tag => tag.id === ID)

    tagInCategory && searchState.topic &&
      url.push(searchState.topic.shortcut)
    */

    tag && url.push(tag.shortcut)

    return "/" + url.join("/")
  }

  function focus() {setSearchState(state => ({ ...state, focused: true }))} 

  function close() {
    if (!searchStore.topic && !searchStore.tag)
      return setSearchState(state => ({...state, focused: false}))

    setSearchState({
      ...searchStore,
      focused: false
    })
  }

  /* Handlers */
  function onMouseDownHandler(event: SMouseEvent<HTMLElement>) {
    // console.group("onMouseDownHandler")

    const target = event.target as HTMLElement
    // console.log("target: ", event.target)

    const getAttr = (name: string) => targetGetAttr(target, name)
    
    const selector = getAttr("selector")
    const action = getAttr("action")
    const id = getAttr("id")
    /*
    console.log(
      ` selector: ${selector}\n`,
      `action: ${action}\n`,
      `id: ${getAttr("id")}\n`
    )
    */
    
    /* Control focus and blur */
    action === "input/focus" && focus() ||
    action === "input/close" && close()
    
    /* Toggle topic and tag */
    selector && isSelector(selector) && 
      toggle(selector, id, togglerTransformAction(action))
    
    /* Redirect on tag add */
    selector === "tag" && action === "add" && id &&
      dispatch(updateSearch({
        ...searchState,
        tag: topics.tags.find(tag => tag.id === +id),
        focused: false
      })) && navigate(getURLByTagID(+id))

    action && action === "search" &&
      dispatch(updateSearch({
        ...searchState,
        focused: false
      }))

    // console.groupEnd()
  } 

  /* Side effects */ 
  /*
    Handle focus and blur events at search input
  */
  function focusedScroll() {
    focusedScrollBootstrap()
    return focusedScrollCleanup
  }

  function focusedScrollBootstrap() {
    if (!searchState.focused || scrolledToRef.current) return

    const scrollTo = containerRef.current?.getBoundingClientRect().top || 0
    const scrollDelay = isMoblie? 6 : 100

    scrolledFromRef.current = document.documentElement.scrollTop
    scrolledToRef.current = true

    document.body.style.overflow = "hidden"
    window.scrollTo({
      top: document.documentElement.scrollTop + scrollTo - scrollDelay,
      behavior: "smooth" 
    })
  }

  function focusedScrollCleanup() {
    if (!searchState.focused || !scrolledToRef.current) return

    document.body.style.overflow = ""
    window.scrollTo({ top: scrolledFromRef.current, behavior: "smooth" })
    scrolledToRef.current = false
  }

  /*
    Handle click away
  */
  function clickAway() {
    if (!searchState.focused)
      document.removeEventListener("click", cbClicAway)
    else
      document.addEventListener("click", cbClicAway)
    
    return () => document.removeEventListener("click", cbClicAway)
  }

  function listener(event: MouseEvent) {
    const target = event.target as HTMLElement
    searchContainerRef.current && target.tagName !== "use" &&
        !searchContainerRef.current.contains(target) &&
          close()
  }
}

export default MentorSearch
