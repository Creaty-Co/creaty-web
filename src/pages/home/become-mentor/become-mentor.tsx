import "./become-mentor.scss"

import { useAppDispatch } from "@app/store"
import { PageLinkType, useGetPagesLinksDocumentsQuery } from "@shared/api"
import { open,PopupLayout } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"

const CN = "become-mentor"
const { getElement, getModifier } = bem(CN)

export function BecomeMentor() {
  const dispatch = useAppDispatch()

  const { t } = useTranslation("translation", { keyPrefix: "views.home.becomeMentor" })
  const { data } = useGetPagesLinksDocumentsQuery()

  const links = data?.results.reduce<Record<PageLinkType["type"], PageLinkType>>(
    (result, next) => ({ ...result, [next.type]: next }),
    {} as never
  )
  const BecomeMentorForm = <PopupLayout title="become_mentor">become_mentor</PopupLayout>
  return (
    <div className="become-mentor">
      <div className={getElement("container")}>
        <div className={getElement("info")}>
          <div className={cn(getElement("title"), "heading")}>{t("title")}</div>

          <div className={getElement("desc")}>{t("desc")}</div>
        </div>

        <div className={getElement("bottom")}>
          <Button size="big" color="dark" onClick={() => dispatch(open(BecomeMentorForm))}>
            {t("button")}
          </Button>

          <div className={getElement("terms")}>{t("terms", { policyLink: links?.privacy_policy.url })}</div>
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
