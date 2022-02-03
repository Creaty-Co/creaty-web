import "./MentorsView.scss"

import MentorCardsContainer from "app/components/containers/MentorCards/MentorCardsContainer"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import useLocalization from "modules/localization/hook"
import { useParams } from "react-router"


function MentorsViewTopicOrTag() {
  const params = useParams<"topicOrTag">()
  if (!params.topicOrTag) {
    throw new Error("This component should be used in Route")
  }

  const ll = useLocalization(ll => ll.views.mentors)
  return (
    <div className="mentors-view">
      <div className="mentors-view__container">
        <div className="mentors-view__header">
          <h1 className="mentors-view__title heading"><span className="weak">{ll.title}:</span> {params.topicOrTag}</h1>
        </div>
        <MentorSearch defaultValue={params.topicOrTag} />
        <MentorCardsContainer />
      </div>
      <HaveQuestions />
    </div>
  )
}


export default MentorsViewTopicOrTag
