import "./mentors.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useScrollToTop from "hooks/useScrollToTop"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { updateSearch } from "redux/reducers/search"
import { bem, classMerge } from "utils/common"

const CN = "mentors-view"
const { getElement } = bem(CN)

function MentorsViewTopicOrTag() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  const dispatch = useDispatch()

  const search = useSelector<DefaultRootState, DefaultRootState["search"]>(state => state.search)
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  const params = useParams<"topicOrTag">()
  
  if (!params.topicOrTag) 
    throw new Error("This component should be used in Route context")

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
            <span className="weak">{t("title")}: </span>
            {pageTitle}
          </div>
        </div>

        <MentorSearch/>

        <MentorCardsContainer
          topic={topicFromURL}
          tag={tagFromURL}
        />
      </div>

      <HaveQuestions/>
    </div>
  )
}


export default MentorsViewTopicOrTag
