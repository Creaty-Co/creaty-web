import "./Mentor.scss"

import { Icon, IconName } from "@shared/ui/Icon/Icon"
import { bem } from "@shared/utils/common"
import cn from "classnames"
import { ReactNode } from "react"

const CN = "user"
const MODSection = "section"
const CNSection = CN + "-" + MODSection
const { getElement: getElementSection, getModifier: getModifierSection } = bem(CNSection)

interface UserSectionProps {
  type: "1" | "2" | "3"
  title?: string | null
  iconName?: IconName
  children: ReactNode
}

export const UserSection = ({ children, iconName, title, type }: UserSectionProps) => (
  <div className={getModifierSection(CNSection, type)}>
    <div className={getElementSection("container")}>
      {title && <div className={cn(getElementSection("title"), "heading", "font--h3-bold")}>{title}</div>}
      <div className={cn(getElementSection("content"), "font--text-regular")}>{children}</div>
    </div>

    {iconName && <Icon className={getElementSection("icon")} name={iconName} />}
  </div>
)
