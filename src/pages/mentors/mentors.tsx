import "./mentors.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { selectTopics } from "@entities"
import { HaveQuestions, MentorSearch, selectSearch, updateSearch } from "@features"
import { useScrollToTop } from "@shared/hooks"
import { bem, classMerge } from "@shared/utils"
import cn from "classnames"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import { MentorCards } from "./mentor-cards/mentor-cards"

const CN = "mentors-view"
const { getElement } = bem(CN)

export function Mentors() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  const dispatch = useAppDispatch()

  const search = useAppSelector(selectSearch)
  const topics = useAppSelector(selectTopics)
  const params = useParams<"topicOrTag">()
      
  useEffect(() => {
    if (!params.topicOrTag) 
      dispatch(updateSearch({ tag: undefined, topic: undefined }))
  }, [])

  const topicFromURL = topics.list.find(topic => topic.shortcut === params.topicOrTag)
  const tagFromURL = topics.tags.find(tag => tag.shortcut === params.topicOrTag)
  const pageTitle = tagFromURL?.title || topicFromURL?.title || params.topicOrTag

  useEffect(() => {
    /*
      Topic from URL to search.topic
    */
    topicFromURL && !tagFromURL && (
      (search.topic && search.topic.id !== topicFromURL.id) ||
      !search.topic
    ) && dispatch(updateSearch({ tag: undefined, topic: topicFromURL }))
      
    /*
      Tag from URL to search.tag
    */
    tagFromURL && (
      (!!search.tag && search.tag.id !== tagFromURL.id) ||
      !search.tag
    ) && dispatch(updateSearch({ tag: tagFromURL }))
      
    /* 
      If tagFromURL isn't part of the topic.tags
      Then set search.topic to undefined
    */
    tagFromURL && search.topic &&
      !search.topic.tags.find(tag => tag.id === tagFromURL.id) &&
        dispatch(updateSearch({ topic: undefined }))
  }, [topics])

  return (
    <div className={CN}>
      <div className={getElement("container")}>
        <div className={getElement("header")}>
          <div 
            className={classMerge(
              getElement("title"),
              "heading"
            )}
          >    
            <span className="weak">{t("title")}{(tagFromURL || topicFromURL) && ":"} </span>
            {pageTitle}
          </div>
          
          {!(tagFromURL || topicFromURL) && 
            <div className={cn(getElement("desc"))}>{t("desc")}</div>
          }
        </div>

        <MentorSearch/>

        <MentorCards
          topic={topicFromURL}
          tag={tagFromURL}
        />
      </div>

      <HaveQuestions/>
    </div>
  )
}

/*
function _Mentors() {
  useScrollToTop()
  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateSearch({
      tag: undefined,
      topic: undefined
    }))
  }, [])

  return (
    <div className="mentors-view">
      <div className="mentors-view__container">
        <div className="mentors-view__header">
          <div className="mentors-view__title heading">{t("title")}</div>
          <p className="mentors-view__desc">{t("desc")}</p>
        </div>
        <MentorSearch />
        <MentorCardsContainer />
      </div>
      <HaveQuestions />
    </div>
  )
}
*/