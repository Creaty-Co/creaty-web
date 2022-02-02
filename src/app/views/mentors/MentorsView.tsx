import "./MentorsView.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useLocalization from "modules/localization/hook"


function MentorsView() {
  const ll = useLocalization(ll => ll.views.mentors)
  return (
    <div className="mentors-view">
      <div className="mentors-view__container">
        <div className="mentors-view__header">
          <h1 className="mentors-view__title heading">{ll.title}</h1>
          <p className="mentors-view__desc">{ll.desc}</p>
        </div>
        <MentorSearch />
        <MentorCardsContainer />
      </div>
      <HaveQuestions />
    </div>
  )
}


export default MentorsView
