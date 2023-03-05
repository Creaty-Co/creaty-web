import "./home.scss"

import { HaveQuestions, HelpSocial, MentorSearch, MentorSearchTags, MentorsSlider } from "@features"
import { useGetPagePersonalQuery, useGetPagesMainQuery } from "@shared/api"
import { useScrollToTop } from "@shared/hooks"
import { BigComment, InfoSection, LoaderCover } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import { BecomeMentor } from "./become-mentor/become-mentor"
import { DynamicPrimaryInfo } from "./dynamic-primary-info/dynamic-primary-info"
import { HelpfulCreaty } from "./helpful-creaty"
import { HowItWorks } from "./how-it-works"
import { MailingSubscribe } from "./mailing-subscribe"
import { QAndA } from "./q-and-a" 

const CN = "home-view"
const { getElement } = bem(CN)

export function Home() {
  useScrollToTop()
  
  const { t } = useTranslation("translation", { keyPrefix: "views.home" })

  const params = useParams<"shortcut">()
  const { data } = params.shortcut
    ? useGetPagePersonalQuery({ shortcut: params.shortcut })
    : useGetPagesMainQuery()

  return (
    <div className={CN}>
      {/* Header  */}
      <div className={getElement("header")}>
        <DynamicPrimaryInfo firstHeadingShortcut={params.shortcut} />

        <div className={getElement("search")}>
          <MentorSearch />
        </div>

        {data?.tags && (
          <MentorSearchTags tags={data.tags} />
        )}

        {data == null && (<LoaderCover white />)}
      </div>

      {/* Coomment */}
      <div className={getElement("comment")}>
        <BigComment>
          {t("bigComment")}
        </BigComment>
      </div>

      {/* Mentors */}
      <div className={getElement("slider")}>
        {data?.mentors && (
          <MentorsSlider mentors={data.mentors} />
        )}

        {data == null && (
          <LoaderCover white />
        )}
      </div>

      {/* Help */}
      <div className={getElement("help")}>
        <InfoSection
          display="flex" 
          type="2" 
          
          title={t("help.title")} 
          desc={t("help.desc")}
        >
          <HelpSocial />
        </InfoSection>
      </div>

      {/* How it works */}
      <div className={getElement("how-it-works")}>
        <HowItWorks />
      </div>

      {/* Helps */}
      <div className={getElement("helpful-creaty")}>
        <HelpfulCreaty />
      </div>

      {/* FAQ */}
      <div className={getElement("faq")}>
        <div className={cn(getElement("title"), "heading")}>
          {t("QAndA.title")}
        </div>  

        <QAndA />
      </div>

      {/* Form */}
      <div className={getElement("have-questions")}>
        <HaveQuestions />
      </div>

      {/* Become mentros */}
      <div className={getElement("become-mentor")}>
        <BecomeMentor />
      </div>

      {/* Subscribe form */}
      <div className={getElement("mailing-subscribe")}>
        <MailingSubscribe />
      </div>
    </div>
  )
}