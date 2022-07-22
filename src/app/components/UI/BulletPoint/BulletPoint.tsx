import "./BulletPoint.scss"

import PopupForm from "app/components/popups/PopupForm"
import useLocalization from "modules/localization/hook"
import { Modal } from "modules/modal/controller"


interface BulletPointProps {
  number: string | number
  title: string
  desc: (string | null)[]
}

function BulletPoint(props: BulletPointProps) {
  const ll = useLocalization(ll => ll.views.home.howItWorks.points[0])
  return (
    <div className="bullet-point">
      <div className="bullet-point__circle">
        <div className="bullet-point__number">{props.number}</div>
      </div>
      <div className="bullet-point__container">
        <div className="bullet-point__title">{props.title}</div>
        <div className="bullet-point__desc">{props.desc.map((chunk, index) => {
          if (chunk === null) {
            return (
              <button type="button" onClick={() => Modal.open(PopupForm, { type: "choose_mentor" })} key={index}>
                <em>{ll.request}</em>
              </button>
            )
          }
          return chunk
        })}</div>
      </div>
    </div>
  )
}


export default BulletPoint
