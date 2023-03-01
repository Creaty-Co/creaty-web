import "./bullet-point.scss"

import { ReactNode } from "react-markdown/lib/react-markdown"

interface BulletPointProps {
  number: string | number
  title: ReactNode
  desc: ReactNode
}

function BulletPoint(props: BulletPointProps) {
  return (
    <div className="bullet-point">
      <div className="bullet-point__circle">
        <div className="bullet-point__number">{props.number}</div>
      </div>
      <div className="bullet-point__container">
        <div className="bullet-point__title">{props.title}</div>
        <p className="bullet-point__desc">{props.desc}</p>
      </div>
    </div>
  )
}


export default BulletPoint
