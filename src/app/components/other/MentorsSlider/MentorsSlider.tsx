import "./MentorsSlider.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { useState } from "react"


function MentorsSlider() {
  const [position, setPosition] = useState(0)
  return (
    <div className="mentors-slider">
      <div className="mentors-slider__header">
        <h2 className="heading">
          <em>Найди своего ментора</em> {"среди\n"}
          профессионалов из креативных индустрий
        </h2>
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
        <ButtonLink size="big" style="outline" to="/help">Получить помощь в подборе ментора</ButtonLink>
      </div>
    </div>
  )
}


export default MentorsSlider
