import "./info-section.scss"

import { bem } from "@shared/utils/common"
import cn from "classnames"

const CN = "info-section"
const { getElement, getModifier } = bem(CN)

export interface IInfoSection {
  type: "1" | "2" | "3"
  display: "flex" | "grid"

  title: React.ReactNode
  desc: React.ReactNode
  children: React.ReactNode

  additional?: string
  className?: string
}

export const InfoSection = ({ additional, className, children, display, title, type, desc }: IInfoSection) => (
  <div className={cn(className, getModifier(CN, display, type))}>
    <div className={getElement("header")}>
      <div className={getElement("title")}>{title}</div>

      <div className={getElement("desc")}>{desc}</div>

      {additional && <div className={getElement("additional")}>{additional}</div>}
    </div>
    <div className={getElement("content")}>{children}</div>
  </div>
)
