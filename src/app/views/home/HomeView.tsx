import "./HomeView.scss"

import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import HelpSocial from "app/components/other/HelpSocial/HelpSocial"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import MentorsSlider from "app/components/other/MentorsSlider/MentorsSlider"
import BigComment from "app/components/UI/BigComment/BigComment"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import useLocalization from "modules/localization/hook"

import BecomeMentor from "./BecomeMentor/BecomeMentor"
import HelpfulCreaty from "./HelpfulCreaty/HelpfulCreaty"
import HowItWorks from "./HowItWorks/HowItWorks"
import MailingSubscribe from "./MailingSubscribe/MailingSubscribe"

function HomeView() {
  const ll = useLocalization(ll => ll.views.home)
  return (
    <div className="home-view">
      <div className="home-view__header">
        <DynamicPrimaryInfo />
        <MentorSearch />
      </div>
      <div className="home-view__comment">
        <BigComment>{ll.bigComment}</BigComment>
      </div>
      <div className="home-view__slider">
        <MentorsSlider />
      </div>
      <div className="home-view__help">
        <InfoSection type="2" display="flex" title="Не знаете с чего начать?" desc="Напишите нам: поможем с выбором ментора и ответим на все ваши вопросы">
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


function DynamicPrimaryInfo() {
  const ll = useLocalization(ll => ll.views.home.primaryInfo)
  return (
    <div className="dynamic-primary-info">
      <h1 className="dynamic-primary-info__title">
        <em>UX дизайн</em>
        <span>{ll.title}</span>
      </h1>
      <h2 className="dynamic-primary-info__desc">{ll.desc}</h2>
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
