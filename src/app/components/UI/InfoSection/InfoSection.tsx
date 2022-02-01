import "./InfoSection.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"


interface InfoSectionProps {
  type: "1" | "2" | "3"
  display: "flex" | "grid"

  title: ReactNode
  desc: ReactNode
  children: ReactNode
}

function InfoSection(props: InfoSectionProps) {
  return (
    <div className={classWithModifiers("info-section", props.display, props.type)}>
      <div className="info-section__header">
        <div className="info-section__title">{props.title}</div>
        <div className="info-section__desc">{props.desc}</div>
      </div>
      <div className="info-section__content">{props.children}</div>
    </div>
  )
}



export default InfoSection
