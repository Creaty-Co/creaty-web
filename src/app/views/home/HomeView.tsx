import "./HomeView.scss"

import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import HelpSocial from "app/components/other/HelpSocial/HelpSocial"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import MentorSearchTags from "app/components/other/MentorSearch/MentorSearchTags"
import MentorsSlider from "app/components/other/MentorsSlider/MentorsSlider"
import BigComment from "app/components/UI/BigComment/BigComment"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import useLocalization from "modules/localization/hook"
import { useEffect, useRef, useState } from "react"

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
        <div className="home-view__search">
          <MentorSearch />
        </div>
        <MentorSearchTags />
      </div>
      <div className="home-view__comment">
        <BigComment>{ll.bigComment}</BigComment>
      </div>
      <div className="home-view__slider">
        <MentorsSlider />
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


function DynamicPrimaryInfo() {
  const topics = useLocalization(ll => ll.other.topics)
  const headings = Object.values(topics)
  const ll = useLocalization(ll => ll.views.home.primaryInfo)

  const rejectRef = useRef<Function>()
  const [currentHeading, setCurrentHeading] = useState(0)
  const [dynamicHeading, setDynamicHeading] = useState(headings[currentHeading])
  async function delay(ms: number) {
    return new Promise<void>((resolve, reject) => {
      rejectRef.current = reject
      setTimeout(resolve, ms)
    })
  }
  async function eraseHeading(heading: string) {
    for (let i = 0; i <= heading.length; i++) {
      await delay(25)
      setDynamicHeading(heading.slice(0, heading.length - i))
    }
  }
  async function writeHeading(heading: string) {
    for (let i = 0; i <= heading.length; i++) {
      await delay(25)
      setDynamicHeading(heading.slice(0, i))
    }
  }
  async function runCycle(heading: string) {
    await writeHeading(heading)
    await delay(10000)
    await eraseHeading(heading)
  }
  useEffect(() => {
    (async () => {
      const heading = headings[currentHeading]
      await runCycle(heading)

      if ((headings.length - 1) === currentHeading) {
        setCurrentHeading(0)
        return
      }
      setCurrentHeading(currentHeading + 1)
    })().catch(error => {
      if (process.env.NODE_ENV === "development") {
        console.warn(error)
      }
    })

    return () => rejectRef.current?.("DynamicPrimaryInfo was unmounted")
  }, [currentHeading, topics])
  return (
    <div className="dynamic-primary-info">
      <h1 className="dynamic-primary-info__title heading">
        <em>{dynamicHeading}</em>
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
