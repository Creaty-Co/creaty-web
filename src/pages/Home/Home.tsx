import "./Home.scss"

import { HaveQuestions, HelpSocial, MentorSearch, MentorSearchTags, MentorsSlider } from "@features"
import { EmaiVerifyModal } from "@features/auth/EmaiVerifyModal/EmaiVerifyModal"
import { ResetPasswordModalForm } from "@features/auth/ResetPasswordModalForm/ResetPasswordModalForm"
import { useGetPagePersonalQuery, useGetPagesMainQuery } from "@shared/api"
import { useScrollToTop } from "@shared/hooks"
import { BigComment, InfoSection, LoaderCover } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useMatch, useParams } from "react-router"

import { BecomeMentor } from "./BecomeMentor/BecomeMentor"
import { DynamicPrimaryInfo } from "./DynamicPrimaryInfo/DynamicPrimaryInfo"
import { HelpfulCreaty } from "./HelpfulCreaty"
import { HowItWorks } from "./HowItWorks"
import { MailingSubscribe } from "./MailingSubscribe/MailingSubscribe"
import { QAndA } from "./QAndA/QAndA"

const CN = "home-view"
const { getElement } = bem(CN)

export function Home() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.home" })

  const params = useParams<"shortcut" | "code">()
  const showResetPasswordModal = useMatch("reset-password/:code")
  const showEmaiVerifyModal = useMatch("email-verify/:code")

  const { data } = params.shortcut ? useGetPagePersonalQuery({ shortcut: params.shortcut }) : useGetPagesMainQuery()

  return (
    <>
      <div className={CN}>
        {/* Header  */}
        <div className={getElement("header")}>
          <DynamicPrimaryInfo firstHeadingShortcut={params.shortcut} />

          <div className={getElement("search")}>
            <MentorSearch />
          </div>

          {data?.tags && <MentorSearchTags tags={data.tags} />}

          {data == null && <LoaderCover white />}
        </div>

        {/* Coomment */}
        <div className={getElement("comment")}>
          <BigComment>{t("bigComment")}</BigComment>
        </div>

        {/* Mentors */}
        <div className={getElement("slider")}>
          {data?.mentors && <MentorsSlider mentors={data.mentors} />}

          {data == null && <LoaderCover white />}
        </div>

        {/* Help */}
        <div className={getElement("help")}>
          <InfoSection display="flex" type="2" title={t("help.title")} desc={t("help.desc")}>
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
          <div className={cn(getElement("title"), "heading")}>{t("QAndA.title")}</div>
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

      <ResetPasswordModalForm code={showResetPasswordModal ? params.code : undefined} />
      <EmaiVerifyModal code={showEmaiVerifyModal ? params.code : undefined} />
    </>
  )
}