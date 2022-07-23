import "./HowItWorks.scss"

import Button from "app/components/common/Button/Button"
import PopupForm from "app/components/popups/PopupForm"
import BulletPoint from "app/components/UI/BulletPoint/BulletPoint"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import { Modal } from "modules/modal/controller"
import { useTranslation } from "react-i18next"


function HowItWorks() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.howItWorks" })
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title heading">{t("title")}</h2>
      <div className="how-it-works__points">
        {t("points").map((point, index) => (
          <BulletPoint number={index + 1} {...point} key={index} />
        ))}
      </div>
      <div className="how-it-works__help">
        <InfoSection type="1" display="flex" {...t("help")}>
          <Button size="big" color="green" onClick={() => Modal.open(PopupForm, { type: "test_meeting", weak: true })}>{t("button")}</Button>
        </InfoSection>
      </div>
    </div >
  )
}


export default HowItWorks
