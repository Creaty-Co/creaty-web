import "./HowItWorks.scss"

import { InfoSection } from "@shared/ui/InfoSection/InfoSection"
import { bem } from "@shared/utils/common"
import { Button } from "antd"
import cn from "classnames"
import { Trans, useTranslation } from "react-i18next"
import { PopupFormWrapper } from "src/components/forms/old/PopupForm/PopupFormWrapper"
import { EFormIds } from "src/store/forms/form.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch } from "src/store/store"

import { BulletPoint } from "./BulletPoint/BulletPoint"

const CN = "how-it-works"
const { getElement } = bem(CN)

export function HowItWorks() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.howItWorks" })
  const dispatch = useAppDispatch()

  const requestButton = (
    <button type="button" onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}>
      <em>{t("requestButton")}</em>
    </button>
  )

  return (
    <div className={CN}>
      <div className={cn(getElement("title"), "heading")}>{t("title")}</div>

      <div className={getElement("points")}>
        <BulletPoint
          number="1"
          title={t("points.1.title")}
          desc={<Trans i18nKey="points.1.desc" t={t} components={{ requestButton }} />}
        />

        <BulletPoint number="2" title={t("points.2.title")} desc={t("points.2.desc")} />

        <BulletPoint number="3" title={t("points.3.title")} desc={t("points.3.desc")} />
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
            className="button button--green button--biggest"
            onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.TEST_MEETING} />))}
            id="howItWorksButton"
          >
            {t("button")}
          </Button>
        </InfoSection>
      </div>
    </div>
  )
}
