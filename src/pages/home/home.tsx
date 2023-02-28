import "./home.scss"

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
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import useScrollToTop from "hooks/useScrollToTop"
import { Modal } from "modules/modal/controller"
import { useEffect } from "react"
import { useQuery } from "react-fetching-library"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { updateSearch } from "redux/reducers/search"

import BecomeMentor from "./become-mentor/become-mentor"
import DynamicPrimaryInfo from "./dynamic-primary-info/dynamic-primary-info"
import HelpfulCreaty from "./helpful-creaty/HelpfulCreaty"
import HowItWorks from "./how-it-works/HowItWorks"
import MailingSubscribe from "./mailing-subscribe/MailingSubscribe"

function HomeView() {
  useScrollToTop()
  
  const { t, i18n } = useTranslation("translation", { keyPrefix: "views.home" })
  const dispatch = useDispatch()

  const params = useParams<"shortcut">()
  const { payload, query } = useQuery(params.shortcut 
    ? getPagePersonal(params.shortcut) 
    : getPagesMain)
  
  useEffect(() => { query() }, [i18n.language])

  return (
    <div className="home-view">
      {/* Header  */}
      <div className="home-view__header">
        <DynamicPrimaryInfo firstHeadingShortcut={params.shortcut} />
        <div className="home-view__search">
          <MentorSearch />
        </div>
        {payload?.tags && (
          <MentorSearchTags tags={payload.tags} />
        )}
        {payload == null && (<LoaderCover white />)}
        <AdminInterface>
          <Button color="white" onClick={() => Modal.open(PopupAdminPersonalTags, { shortcut: params.shortcut, tags: payload?.tags || [] })}>Изменить тэги</Button>
        </AdminInterface>
      </div>

      {/* Coomment */}
      <div className="home-view__comment">
        <BigComment>{t("bigComment")}</BigComment>
      </div>

      {/* Mentors */}
      <div className="home-view__slider">
        {payload?.mentors && (
          <MentorsSlider mentors={payload.mentors} />
        )}
        {payload == null && (
          <LoaderCover white />
        )}
      </div>

      {/* Help */}
      <div className="home-view__help">
        <InfoSection type="2" display="flex" title={t("help.title")} desc={t("help.desc")}>
          <HelpSocial />
        </InfoSection>
      </div>

      {/* How it works */}
      <div className="home-view__how-it-works">
        <HowItWorks />
      </div>

      {/* Helps */}
      <div className="home-view__helpful-creaty">
        <HelpfulCreaty />
      </div>

      {/* FAQ */}
      <div className="home-view__faq">
        <div className="heading home-view__title">{t("QAndA.title")}</div>
        <QAndA />
      </div>

      {/* Form */}
      <div className="home-view__have-questions">
        <HaveQuestions />
      </div>

      {/* Become mentros */}
      <div className="home-view__become-mentor">
        <BecomeMentor />
      </div>

      {/* Subscribe form */}
      <div className="home-view__mailing-subscribe">
        <MailingSubscribe />
      </div>
    </div>
  )
}

function QAndA() {
  const { i18n } = useTranslation("translation", { keyPrefix: "lang" })
  const { error, loading, payload, query } = useQuery(getPagesFAQs)
  useEffect(() => { query() }, [i18n.language])
  if (error) return <>useQuery error</>
  if (loading) return <LoaderCover white />
  return (
    <FAQ>
      {payload?.results.map(faq => (
        <FAQClause summary={faq.question} key={faq.id}>
          <ReactMarkdown>{faq.answer}</ReactMarkdown>
          <AdminInterface>
            <Button color="white" onClick={() => Modal.open(PopupAdminEditFAQ, { faq })}>Редактировать вопрос</Button>
          </AdminInterface>
        </FAQClause>
      ))}
      <AdminInterface>
        <Button color="white" onClick={() => Modal.open(PopupAdminNewFAQ)}>Добавить вопрос</Button>
      </AdminInterface>
    </FAQ>
  )
}


export default HomeView
