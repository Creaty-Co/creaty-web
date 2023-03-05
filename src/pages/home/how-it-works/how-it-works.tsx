import "./how-it-works.scss"

import { useAppDispatch } from "@app/store"
import { PopupForm } from "@features/popup-form" 
import { open } from "@shared/layout/modal"
import { BulletPoint ,Button, InfoSection } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { Trans, useTranslation } from "react-i18next"

const CN = "how-it-works"
const { getElement } = bem(CN)

export function HowItWorks() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.howItWorks" })
  const dispatch = useAppDispatch()

  const requestButton = (
    // <button type="button" onClick={() => dispatch(open(PopupForm, { type: "choose_mentor", weak: true }))}>
    <button type="button" onClick={() => dispatch(open(<PopupForm type="choose_mentor" />))}>
      <em>{t("requestButton")}</em>
    </button>
  )

  return (
    <div className={CN}>
      <div className={cn(getElement("title"), "heading")}>
        {t("title")}
      </div>

      <div className={getElement("points")}>
        <BulletPoint 
          number="1" 
          title={t("points.1.title")} 
          desc={(<Trans i18nKey="points.1.desc" t={t} components={{ requestButton }} />)} 
        />

        <BulletPoint
          number="2" 
          title={t("points.2.title")}
          desc={t("points.2.desc")}
        />

        <BulletPoint
          number="3"
          title={t("points.3.title")}
          desc={t("points.3.desc")}
        />
      </div>

      <div className={getElement("help")}>
        <InfoSection
          additional="*Free trial session is held only if the mentor is willing to conduct such sessions"
          className={getElement("free")} 

          display="flex" 
          type="1" 
          
          title={t("help.title")}
          desc={t("help.desc")}
        >
          <Button 
            className={cn(getElement("button"), getElement("button_free"))} 
            size="big" color="green"

            onClick={() => dispatch(open(<PopupForm type="test_meeting" />))}
          >
            {t("button")}
          </Button>
        </InfoSection>
      </div>
    </div>
  )
}