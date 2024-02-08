import "./Home.scss"

import { EModalsRoutes } from "@app/router"
import { EmaiVerifyModalForm } from "@components/forms/emaiVerify/EmaiVerifyModalForm"
import { EmaiVerifySuccessModal } from "@components/forms/emaiVerify/EmaiVerifySuccessModal"
import { LoginModalForm } from "@components/forms/LoginModalForm"
import { ResetPasswordMentorSuccessModal } from "@components/forms/ResetPasswordMentorSuccessModal"
import { ResetPasswordModalForm } from "@components/forms/ResetPasswordModalForm"
import { SignupModalFormStep1 } from "@components/forms/SignUp/SignupModalFormStep1"
import { HaveQuestions } from "@components/HaveQuestions/HaveQuestions"
import { HelpSocial } from "@components/HelpSocial/HelpSocial"
import { MentorsSlider } from "@components/MentorsSlider/MentorsSlider"
import { Search } from "@components/Search/Search"
import { useScrollToTop } from "@shared/hooks/useScrollToTop"
import { InfoSection } from "@shared/ui/InfoSection/InfoSection"
import { LoaderCover } from "@shared/ui/LoaderCover/LoaderCover"
import { bem } from "@shared/utils/common"
import { authPassedS, isMentorS } from "@store/auth/auth.slice"
import { useGetPagePersonalQuery, useGetPagesMainQuery } from "@store/pages/pages.api"
import { useAppSelector } from "@store/store"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useMatch, useParams } from "react-router"
import { EmaiVerifyModalForm } from "src/components/forms/emaiVerify/EmaiVerifyModalForm"
import { EmaiVerifySuccessModal } from "src/components/forms/emaiVerify/EmaiVerifySuccessModal"
import { LoginModalForm } from "src/components/forms/LoginModalForm"
import { ResetPasswordMentorSuccessModal } from "src/components/forms/ResetPasswordMentorSuccessModal"
import { ResetPasswordModalForm } from "src/components/forms/ResetPasswordModalForm"
import { SignupModalFormStep1 } from "src/components/forms/SignUp/SignupModalFormStep1"
import { HaveQuestions } from "src/components/HaveQuestions/HaveQuestions"
import { HelpSocial } from "src/components/HelpSocial/HelpSocial"
import { MentorsSlider } from "src/components/MentorsSlider/MentorsSlider"
import { Search } from "src/components/Search/Search"
import { authPassedS, isMentorS } from "src/store/auth/auth.slice"
import { useGetPagePersonalQuery, useGetPagesMainQuery } from "src/store/pages/pages.api"
import { useAppSelector } from "src/store/store"

import { BecomeMentor } from "./BecomeMentor/BecomeMentor"
import { BigComment } from "./BigComment/BigComment"
import { DynamicPrimaryInfo } from "./DynamicPrimaryInfo/DynamicPrimaryInfo"
import { HelpfulCreaty } from "./HelpfulCreaty/HelpfulCreaty"
import { HowItWorks } from "./HowItWorks/HowItWorks"
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

          <Search />

          {/* {data?.tags && <MentorSearchTags tags={data.tags} />} */}

          {data == null && <LoaderCover white />}
        </div>

        <div className={getElement("comment")}>
          <BigComment>{t("bigComment")}</BigComment>
        </div>

        <div className={getElement("slider")}>
          {data?.mentors && <MentorsSlider mentors={data.mentors} />}

          {data == null && <LoaderCover white />}
        </div>

        <div className={getElement("help")}>
          <InfoSection display="flex" type="2" title={t("help.title")} desc={t("help.desc")}>
            <HelpSocial />
          </InfoSection>
        </div>

        <div className={getElement("how-it-works")}>
          <HowItWorks />
        </div>

        <div className={getElement("helpful-creaty")}>
          <HelpfulCreaty />
        </div>

        <div className={getElement("faq")}>
          <div className={cn(getElement("title"), "heading")}>{t("QAndA.title")}</div>
          <QAndA />
        </div>

        <div className={getElement("have-questions")}>
          <HaveQuestions />
        </div>

        {(!isMentor || !authPassed) && (
          <div className={getElement("become-mentor")}>
            <BecomeMentor />
          </div>
        )}
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
