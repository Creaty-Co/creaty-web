import "./mentors.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useScrollToTop from "hooks/useScrollToTop"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { updateSearch } from "redux/reducers/search"

function Mentors() {
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


export default Mentors
