import "./HelpfulCreaty.scss"

import Button from "app/components/common/Button/Button"
import PopupForm from "app/components/popups/PopupForm"
import { Modal } from "modules/modal/controller"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"

function HelpfulCreaty() {
  const { t } = useTranslation("translation", { keyPrefix: "components.helpfulCreaty" })
  return (
    <div className="helpful-creaty">
      <div className="helpful-creaty__group">
        <h2 className="helpful-creaty__title heading">{t("title")}</h2>
        <HelpfulCreatyBlock title={"blocks.1.title"} desc={"blocks.1.desc"} flag="yellow" />
        <HelpfulCreatyBlock title={"blocks.2.title"} desc={"blocks.2.desc"} flag="purple" />
      </div>

      <div className="helpful-creaty__group">
        <HelpfulCreatyBlock title={"blocks.3.title"} desc={"blocks.3.desc"} flag="orange" />
        <HelpfulCreatyBlock title={"blocks.4.title"} desc={"blocks.4.desc"} flag="blue" />
        <Button className="helpful-creaty__button" outline color="green" onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>{t("button")}</Button>
      </div>
    </div>
  )
}

interface HelpfulCreatyBlockProps {
  title: ReactNode
  desc: ReactNode

  flag: "yellow" | "orange" | "blue" | "purple"
}

function HelpfulCreatyBlock(props: HelpfulCreatyBlockProps) {
  return (
    <div className="helpful-creaty-block" >
      <div className="helpful-creaty-block__header">
        <div className="helpful-creaty-block__title">{props.title}</div>
        <div className="helpful-creaty-block__circle">
          <img src={`/static/icons/flags/flag-${props.flag}.svg`} alt={props.flag + " flag"} className="helpful-creaty-block__flag" />
        </div>
      </div>
      <div className="helpful-creaty-block__content">{props.desc}</div>
    </div>
  )
}

export default HelpfulCreaty
