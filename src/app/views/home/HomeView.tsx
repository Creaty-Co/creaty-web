import "./HomeView.scss"

import { getPagePersonal, getPagesFAQs, getPagesMain } from "api/actions/pages"
import AdminInterface from "app/components/admin/AdminInterface"
import Button from "app/components/common/Button/Button"
import HaveQuestions from "app/components/other/HaveQuestions/HaveQuestions"
import HelpSocial from "app/components/other/HelpSocial/HelpSocial"
import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import MentorSearchTags from "app/components/other/MentorSearch/MentorSearchTags"
import MentorsSlider from "app/components/other/MentorsSlider/MentorsSlider"
import { PopupAdminEditFAQ, PopupAdminNewFAQ } from "app/components/popups/PopupAdmin/PopupAdminFAQ"
import { PopupAdminPersonalTags } from "app/components/popups/PopupAdmin/PopupAdminPersonalPage"
import BigComment from "app/components/UI/BigComment/BigComment"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import useScrollToTop from "hooks/useScrollToTop"
import useLocalization from "modules/localization/hook"
import { Popup } from "modules/popup/controller"
import { useEffect } from "react"
import { useQuery } from "react-fetching-library"
import ReactMarkdown from "react-markdown"
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
        <AdminInterface>
          <Button color="white" onClick={() => Popup.open(PopupAdminPersonalTags, { shortcut: params.shortcut, tags: payload?.tags || [] })}>Изменить тэги</Button>
        </AdminInterface>
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
  const { error, loading, payload } = useQuery(getPagesFAQs)
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>
  return (
    <FAQ>
      {payload.results.map((faq) => (
        <FAQClause summary={faq.question} key={faq.id}>
          <ReactMarkdown>{faq.answer}</ReactMarkdown>
          <AdminInterface>
            <Button color="white" onClick={() => Popup.open(PopupAdminEditFAQ, { faq })}>Редактировать вопрос</Button>
          </AdminInterface>
        </FAQClause>
      ))}
      <AdminInterface>
        <Button color="white" onClick={() => Popup.open(PopupAdminNewFAQ)}>Добавить вопрос</Button>
      </AdminInterface>
    </FAQ>
  )
}


export default HomeView
