import "./MentorsView.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useScrollToTop from "hooks/useScrollToTop"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { updateSearchTag, updateSearchTopic } from "redux/reducers/search"


function MentorsViewTopicOrTag() {
  useScrollToTop()
  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  const dispatch = useDispatch()
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  const params = useParams<"topicOrTag">()
  if (!params.topicOrTag) {
    throw new Error("This component should be used in Route context")
  }

  const topic = topics.list.find(topic => topic.shortcut === params.topicOrTag)
  const tag = topics.tags.find(tag => tag.shortcut === params.topicOrTag)

  useEffect(() => {
    if (topic) dispatch(updateSearchTopic(topic))
    if (tag) dispatch(updateSearchTag(tag))

    window.scrollTo(0, 0)
  }, [topic, tag])

  return (
    <div className="mentors-view">
      <div className="mentors-view__container">
        <div className="mentors-view__header">
          <h1 className="mentors-view__title heading">
            <span className="weak">{t("title")}:</span> {topic?.title || tag?.title || params.topicOrTag}
          </h1>
        </div>
        <MentorSearch />
        <MentorCardsContainer topic={topic} tag={tag} />
      </div>
      <HaveQuestions />
    </div>
  )
}


export default MentorsViewTopicOrTag
