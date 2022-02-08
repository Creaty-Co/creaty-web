import "./MentorsSlider.scss"

import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import PopupForm from "app/components/popups/PopupForm"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { Popup } from "modules/popup/controller"
import { useState } from "react"


function MentorsSlider() {
  const [position, setPosition] = useState(0)
  return (
    <div className="mentors-slider">
      <div className="mentors-slider__header">
        <h3 className="heading">
          <em>Найди своего ментора</em> {"среди\n"}
          профессионалов из креативных индустрий
        </h3>
        <div className="mentors-slider__buttons">
          <button className="mentors-slider__button" onClick={() => setPosition(position - 1)}>
            <Icon className="mentors-slider__icon" name="arrow-left" />
          </button>
          <button className="mentors-slider__button" onClick={() => setPosition(position + 1)}>
            <Icon className="mentors-slider__icon" name="arrow-right" />
          </button>
        </div>
      </div>
      <div className="mentors-slider__container">
        <div className="mentors-slider__inner">
          {[...Array(21)].map((_, index) => (
            <MentorCard key={index} />
          ))}
        </div>
      </div>
      <div className="mentors-slider__help">
        <ButtonLink size="big" color="white" to="/mentors">Посмотреть всех менторов</ButtonLink>
        <span>или</span>
        <Button size="big" style="outline" onClick={() => Popup.open(PopupForm, { type: "choose_mentor" })}>Получить помощь в подборе ментора</Button>
      </div>
    </div>
  )
}


export default MentorsSlider
