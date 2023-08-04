import "./Home.scss"

import { useAppSelector } from "@app/store"
import { HaveQuestions, HelpSocial, MentorSearch, MentorSearchTags, MentorsSlider } from "@features"
import { authPassedS, isMentorS } from "@features/auth/auth.slice"
import { EmaiVerifyModalForm } from "@features/auth/forms/emaiVerify/EmaiVerifyModalForm"
import { EmaiVerifySuccessModal } from "@features/auth/forms/emaiVerify/EmaiVerifySuccessModal"
import { LoginModalForm } from "@features/auth/forms/LoginModalForm"
import { ResetPasswordMentorSuccessModal } from "@features/auth/forms/ResetPasswordMentorSuccessModal"
import { ResetPasswordModalForm } from "@features/auth/forms/ResetPasswordModalForm"
import { SignupModalFormStep1 } from "@features/auth/forms/SignUp/SignupModalFormStep1"
import { useGetPagePersonalQuery, useGetPagesMainQuery } from "@shared/api"
import { useScrollToTop } from "@shared/index"
import { BigComment, InfoSection, LoaderCover } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useMatch, useParams } from "react-router"

import { EModalsRoutes } from ".."
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

  const authPassed = useAppSelector(authPassedS)
  const isMentor = useAppSelector(isMentorS)

  const showLoginModal = useMatch(EModalsRoutes.LOGIN)
  const showSignUpModal = useMatch(EModalsRoutes.SIGN_UP)
  const showResetPasswordModal = useMatch(EModalsRoutes.RESET_PASSWORD_CODE)
  const showResetPasswordMentorSuccessModal = useMatch(EModalsRoutes.RESET_PASSWORD_MENTOR_SUCCESS)
  const showEmaiVerifyModal = useMatch(EModalsRoutes.EMAIL_VERIFY_CODE)
  const showEmaiVerifySuccessModal = useMatch(EModalsRoutes.EMAIL_VERIFY_SUCCESS)

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

        {(!isMentor || !authPassed) && (
          <div className={getElement("become-mentor")}>
            <BecomeMentor />
          </div>
        )}
        {/* Subscribe form */}
        <div className={getElement("mailing-subscribe")}>
          <MailingSubscribe />
        </div>
      </div>

      <LoginModalForm show={!!showLoginModal} />
      <SignupModalFormStep1 show={!!showSignUpModal} />
      <ResetPasswordModalForm code={showResetPasswordModal ? params.code : undefined} />
      <ResetPasswordMentorSuccessModal show={!!showResetPasswordMentorSuccessModal} />
      <EmaiVerifyModalForm code={showEmaiVerifyModal ? params.code : undefined} />
      <EmaiVerifySuccessModal show={!!showEmaiVerifySuccessModal} />
    </>
  )
}
