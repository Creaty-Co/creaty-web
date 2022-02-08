import "./BecomeMentor.scss"

import Button from "app/components/common/Button/Button"
import PopupForm from "app/components/popups/PopupForm"
import useLocalization from "modules/localization/hook"
import { Popup } from "modules/popup/controller"


function BecomeMentor() {
  const ll = useLocalization(ll => ll.views.home.becomeMentor)
  return (
    <div className="become-mentor">
      <div className="become-mentor__container">
        <div className="become-mentor__info">
          <h2 className="become-mentor__title heading">{ll.title}</h2>
          <ul className="become-mentor__desc">
            {ll.descPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="become-mentor__bottom">
          <Button size="big" color="dark" onClick={() => Popup.open(PopupForm, { type: "test_meeting" })}>{ll.button}</Button>
          <div className="become-mentor__terms">{ll.terms}</div>
        </div>
      </div>
      <div className="become-mentor__images">
        <img src="/static/images/mentor-cards/1.png" alt="stock image of mentor" />
        <img src="/static/images/mentor-cards/2.png" alt="stock image of mentor" />
        <img src="/static/images/mentor-cards/3.png" alt="stock image of mentor" />
      </div>
    </div>
  )
}


export default BecomeMentor
