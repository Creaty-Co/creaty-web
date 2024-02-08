import "./Mentors.scss"

import { HaveQuestions } from "@components/HaveQuestions/HaveQuestions"
import { Search } from "@components/Search/Search"
import { useScrollToTop } from "@shared/hooks/useScrollToTop"
import { bem, classMerge } from "@shared/utils/common"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"
import { HaveQuestions } from "src/components/HaveQuestions/HaveQuestions"
import { Search } from "src/components/Search/Search"

import { MentorCards } from "./MentorCards/MentorCards"

const CN = "mentors-view"
const { getElement } = bem(CN)

export function Mentors() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  // const search = useAppSelector(selectSearch)
  const topics: any = []
  // const topics = useAppSelector(selectTopics)
  const params = useParams<"topicOrTag">()

  const topicFromURL = topics.find((topic: { shortcut: string | undefined }) => topic.shortcut === params.topicOrTag)
  const tagFromURL = topics.find((tag: { shortcut: string | undefined }) => tag.shortcut === params.topicOrTag)
  const pageTitle = tagFromURL?.title || topicFromURL?.title || params.topicOrTag

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

        <Search fullWidth />

        <MentorCards topic={topicFromURL} tag={tagFromURL} />
      </div>

      <HaveQuestions />
    </div>
  )
}
