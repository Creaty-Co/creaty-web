import "./HomeView.scss"

import { getPagePersonal, getPagesMain } from "api/actions/pages"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import HelpSocial from "app/components/other/HelpSocial/HelpSocial"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import MentorSearchTags from "app/components/other/MentorSearch/MentorSearchTags"
import MentorsSlider from "app/components/other/MentorsSlider/MentorsSlider"
import BigComment from "app/components/UI/BigComment/BigComment"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import useScrollToTop from "hooks/useScrollToTop"
import useLocalization from "modules/localization/hook"
import { useEffect } from "react"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"

import BecomeMentor from "./BecomeMentor/BecomeMentor"
import DynamicPrimaryInfo from "./DynamicPrimaryInfo/DynamicPrimaryInfo"
import HelpfulCreaty from "./HelpfulCreaty/HelpfulCreaty"
import HowItWorks from "./HowItWorks/HowItWorks"
import MailingSubscribe from "./MailingSubscribe/MailingSubscribe"


function HomeView() {
  useScrollToTop()
  const ll = useLocalization(ll => ll.views.home)
  const params = useParams<"shortcut">()
  const { payload, query } = useQuery(params.shortcut ? getPagePersonal(params.shortcut) : getPagesMain)
  useEffect(() => { query() }, [ll])
  return (
    <div className="home-view">
      <div className="home-view__header">
        <DynamicPrimaryInfo firstHeadingShortcut={params.shortcut} />
        <div className="home-view__search">
          <MentorSearch />
        </div>
        {payload?.tags && (
          <MentorSearchTags tags={payload.tags} />
        )}
      </div>
      <div className="home-view__comment">
        <BigComment>{ll.bigComment}</BigComment>
      </div>
      <div className="home-view__slider">
        {payload?.mentors && (
          <MentorsSlider mentors={payload.mentors} />
        )}
      </div>
      <div className="home-view__help">
        <InfoSection type="2" display="flex" {...ll.help}>
          <HelpSocial />
        </InfoSection>
      </div>
      <div className="home-view__how-it-works">
        <HowItWorks />
      </div>
      <div className="home-view__helpful-creaty">
        <HelpfulCreaty />
      </div>
      <div className="home-view__faq">
        <h2 className="heading">{ll.QAndA.title}</h2>
        <QAndA />
      </div>
      <div className="home-view__have-questions">
        <HaveQuestions />
      </div>
      <div className="home-view__become-mentor">
        <BecomeMentor />
      </div>
      <div className="home-view__mailing-subscribe">
        <MailingSubscribe />
      </div>
    </div>
  )
}


function QAndA() {
  const ll = useLocalization(ll => ll.views.home.QAndA)
  return (
    <FAQ>
      {ll.clauses.map((clause, index) => (
        <FAQClause summary={clause.summary} key={index}>
          <ul>
            {clause.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </FAQClause>
      ))}
    </FAQ>
  )
}


export default HomeView
