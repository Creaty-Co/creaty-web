import "./bullet-point.scss"

import { bem } from "@shared/utils"
import { ReactNode } from "react-markdown/lib/react-markdown"

const CN = "bullet-point"
const { getElement } = bem(CN)

export interface IBulletPoint {
  number: string | number
  title: ReactNode
  desc: ReactNode
}

export function BulletPoint(props: IBulletPoint) {
  return (
    <div className={CN}>
      <div className={getElement("circle")}>
        <div className={getElement("number")}>{props.number}</div>
      </div>
      <div className={getElement("container")}>
        <div className={getElement("title")}>{props.title}</div>
        <p className={getElement("desc")}>{props.desc}</p>
      </div>
    </div>
  )
}