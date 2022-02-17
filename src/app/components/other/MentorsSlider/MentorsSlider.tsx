import "./MentorsSlider.scss"

import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import PopupForm from "app/components/popups/PopupForm"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { MentorType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { Popup } from "modules/popup/controller"
import { useEffect, useRef, useState } from "react"


interface MentorsSliderProps {
  mentors: MentorType[]
}

function MentorsSlider(props: MentorsSliderProps) {
  const ll = useLocalization(ll => ll.components.mentorsSlider)
  const innerRef = useRef<HTMLDivElement>(null)
  function prev() {
    slideBy(-1)
  }
  function next() {
    slideBy(+1)
  }
  function slideBy(by: 1 | -1) {
    if (!innerRef.current) return

    const firstChild = innerRef.current.children[0]
    if (!(firstChild instanceof HTMLElement)) return
    const secondChild = innerRef.current.children[1]
    if (!(secondChild instanceof HTMLElement)) return

    // Calc the "offsetLeft" difference between two elements to account all gaps
    const scrollInterval = secondChild.offsetLeft - firstChild.offsetLeft

    innerRef.current.scrollBy({
      behavior: "smooth",
      left: scrollInterval * by
    })
  }
  return (
    <div className="mentors-slider">
      <div className="mentors-slider__header">
        <h3 className="heading">{ll.title}</h3>
        <div className="mentors-slider__buttons">
          <button className="mentors-slider__button" onClick={prev}>
            <Icon className="mentors-slider__icon" name="arrow-left" />
          </button>
          <button className="mentors-slider__button" onClick={next}>
            <Icon className="mentors-slider__icon" name="arrow-right" />
          </button>
        </div>
      </div>
      <div className="mentors-slider__container">
        <div className="mentors-slider__inner" ref={innerRef}>
          {props.mentors.map(mentor => (
            <MentorCard {...mentor} key={mentor.id} />
          ))}
        </div>
      </div>
      <div className="mentors-slider__help">
        <ButtonLink size="big" color="white" to="/mentors">{ll.seeAllMentors}</ButtonLink>
        <span>{ll.or}</span>
        <Button size="big" style="outline" onClick={() => Popup.open(PopupForm, { type: "choose_mentor" })}>{ll.getHelp}</Button>
      </div>
    </div>
  )
}


export default MentorsSlider
