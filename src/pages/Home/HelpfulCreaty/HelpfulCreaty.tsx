import "./HelpfulCreaty.scss"

import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { bem } from "@shared/utils/common"
import cn from "classnames"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { PopupFormWrapper } from "src/components/forms/old/PopupForm/PopupFormWrapper"
import { EFormIds } from "src/store/forms/form.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch } from "src/store/store"

const CN = "helpful-creaty"
const { getElement } = bem(CN)

export function HelpfulCreaty() {
  const { t } = useTranslation("translation", { keyPrefix: "components.helpfulCreaty" })
  const dispatch = useAppDispatch()

  return (
    <div className="helpful-creaty">
      <div className={getElement("group")}>
        <div className={cn(getElement("title"), "heading")}>{t("title")}</div>

        <HelpfulCreatyBlock title={t("blocks.1.title")} desc={t("blocks.1.desc")} flag="yellow" />

        <HelpfulCreatyBlock title={t("blocks.2.title")} desc={t("blocks.2.desc")} flag="purple" />
      </div>

      <div className={getElement("group")}>
        <HelpfulCreatyBlock title={t("blocks.3.title")} desc={t("blocks.3.desc")} flag="orange" />

        <HelpfulCreatyBlock title={t("blocks.4.title")} desc={t("blocks.4.desc")} flag="blue" />

        <SharedButton
          className={getElement("button")}
          outline
          color="green"
          onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
        >
          {t("button")}
        </SharedButton>
      </div>
    </div>
  )
}

/* Block */
export interface IHelpfulCreatyBlock {
  title: ReactNode
  desc: ReactNode

  flag: "yellow" | "orange" | "blue" | "purple"
}

const CNBlock = CN + "-block"
const { getElement: getElementBlock } = bem(CNBlock)

export function HelpfulCreatyBlock(props: IHelpfulCreatyBlock) {
  return (
    <div className={CNBlock}>
      <div className={getElementBlock("header")}>
        <div className={getElementBlock("title")}>{props.title}</div>

        <div className={getElementBlock("circle")}>
          <img
            src={`/static/icons/flags/flag-${props.flag}.svg`}
            alt={props.flag + " flag"}
            className={getElementBlock("flag")}
          />
        </div>
      </div>

      <div className={getElementBlock("content")}>{props.desc}</div>
    </div>
  )
}
