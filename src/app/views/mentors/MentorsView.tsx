import "./MentorsView.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useScrollToTop from "hooks/useScrollToTop"
import { useTranslation } from "react-i18next"


function MentorsView() {
  useScrollToTop()
  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })
  return (
    <div className="mentors-view">
      <div className="mentors-view__container">
        <div className="mentors-view__header">
          <h1 className="mentors-view__title heading">{t("title")}</h1>
          <p className="mentors-view__desc">{t("desc")}</p>
        </div>
        <MentorSearch />
        <MentorCardsContainer />
      </div>
      <HaveQuestions />
    </div>
  )
}


export default MentorsView
