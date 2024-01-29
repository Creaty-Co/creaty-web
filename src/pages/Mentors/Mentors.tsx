import "./Mentors.scss"

import { HaveQuestions, Search } from "@features"
import { useScrollToTop } from "@shared/index"
import { bem, classMerge } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import { MentorCards } from "./mentor-cards/mentor-cards"

const CN = "mentors-view"
const { getElement } = bem(CN)

export function Mentors() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  // const dispatch = useAppDispatch()
  // const search = useAppSelector(selectSearch)
  const topics: any = []
  // const topics = useAppSelector(selectTopics)
  const params = useParams<"topicOrTag">()

  // useEffect(() => {
  //   if (!params.topicOrTag) dispatch(updateSearch({ tag: undefined, topic: undefined }))
  // }, [])

  const topicFromURL = topics.find((topic: { shortcut: string | undefined }) => topic.shortcut === params.topicOrTag)
  const tagFromURL = topics.find((tag: { shortcut: string | undefined }) => tag.shortcut === params.topicOrTag)
  const pageTitle = tagFromURL?.title || topicFromURL?.title || params.topicOrTag

  // useEffect(() => {
  //   /*
  //     Topic from URL to search.topic
  //   */
  //   if (topicFromURL && !tagFromURL && ((search.topic && search.topic.id !== topicFromURL.id) || !search.topic)) {
  //     // dispatch(updateSearch({ tag: undefined, topic: topicFromURL }))
  //   }

  //   /*
  //     Tag from URL to search.tag
  //   */
  //   if (tagFromURL && ((!!search.tag && search.tag.id !== tagFromURL.id) || !search.tag)) {
  //     // dispatch(updateSearch({ tag: tagFromURL }))
  //   }

  //   /*
  //     If tagFromURL isn't part of the topic.tags
  //     Then set search.topic to undefined
  //   */
  //   if (tagFromURL && search.topic && !search.topic.tags.find((tag: { id: unknown }) => tag.id === tagFromURL.id)) {
  //     // dispatch(updateSearch({ topic: undefined }))
  //   }
  // }, [topics, tagFromURL, topicFromURL])

  return (
    <div className={CN}>
      <div className={getElement("container")}>
        <div className={getElement("header")}>
          <div className={classMerge(getElement("title"), "heading")}>
            <span className="weak">
              {t("title")}
              {(tagFromURL || topicFromURL) && ":"}{" "}
            </span>
            {pageTitle}
          </div>

          {!(tagFromURL || topicFromURL) && <div className={cn(getElement("desc"))}>{t("desc")}</div>}
        </div>

        <Search fullWidth/>

        <MentorCards topic={topicFromURL} tag={tagFromURL} />
      </div>

      <HaveQuestions />
    </div>
  )
}
