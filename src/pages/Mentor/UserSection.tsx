import "./Mentor.scss"

import { Icon, IconName } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode /*, useEffect*/ } from "react"

const CN = "user"
const MODSection = "section"
const CNSection = CN + "-" + MODSection
const { getElement: getElementSection, getModifier: getModifierSection } = bem(CNSection)

interface UserSectionProps {
  type: "1" | "2" | "3"
  title?: string
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
