import "./HowItWorks.scss"

import Button from "app/components/common/Button/Button"
import PopupForm from "app/components/popups/PopupForm"
import BulletPoint from "app/components/UI/BulletPoint/BulletPoint"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import { Modal } from "modules/modal/controller"
import { Trans, useTranslation } from "react-i18next"

function HowItWorks() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.howItWorks" })
  const requestButton = (
    <button type="button" onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>
      <em>{t("requestButton")}</em>
    </button>
  )
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title heading">{t("title")}</h2>
      <div className="how-it-works__points">
        <BulletPoint number="1" {...t("points.1")} desc={(
          <Trans i18nKey="points.1.desc" t={t} components={{ requestButton }} />
        )} />
        <BulletPoint number="2" {...t("points.2")} />
        <BulletPoint number="3" {...t("points.3")} />
      </div>
      <div className="how-it-works__help">
        <InfoSection type="1" display="flex" title={t("help.title")} desc={t("help.desc")}>
          <Button size="big" color="green" onClick={() => Modal.open(PopupForm, { type: "test_meeting", weak: true })}>{t("button")}</Button>
        </InfoSection>
      </div>
    </div>
  )
}

export default HowItWorks
