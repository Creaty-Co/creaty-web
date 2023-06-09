import "./BecomeMentor.scss"

import { useAppDispatch } from "@app/store"
import { PopupFormBecomeMentor } from "@features"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"

const CN = "become-mentor"
const { getElement, getModifier } = bem(CN)

export function BecomeMentor() {
  const dispatch = useAppDispatch()

  const { t } = useTranslation("translation", { keyPrefix: "views.home.becomeMentor" })

  return (
    <div className="become-mentor">
      <div className={getElement("container")}>
        <div className={getElement("info")}>
          <div className={cn(getElement("title"), "heading")}>{t("title")}</div>

          <div className={getElement("desc")}>{t("desc")}</div>
        </div>

        <div className={getElement("bottom")}>
          <Button size="big" color="dark" onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}>
            {t("button")}
          </Button>

          <div className={getElement("terms")}>{t("terms")}</div>
        </div>
      </div>

      <div className={getElement("images")}>
        <div className={getModifier(getElement("image"), "1")}>
          <img src="/static/images/mentor-cards/1.png" alt="stock image of mentor" />
        </div>

        <div className={getModifier(getElement("image"), "2")}>
          <img src="/static/images/mentor-cards/2.png" alt="stock image of mentor" />
        </div>

        <div className={getModifier(getElement("image"), "3")}>
          <img src="/static/images/mentor-cards/3.png" alt="stock image of mentor" />
        </div>
      </div>
    </div>
  )
}