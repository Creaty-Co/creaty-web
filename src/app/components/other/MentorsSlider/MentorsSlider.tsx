import "./MentorsSlider.scss"

import Button from "app/components/common/Button/Button"
import ButtonIcon from "app/components/common/Button/ButtonIcon"
import ButtonLink from "app/components/common/Button/ButtonLink"
import PopupForm from "app/components/popups/PopupForm"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { MentorType } from "interfaces/types"
import { Modal } from "modules/modal/controller"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"


interface MentorsSliderProps {
  mentors: MentorType[]
}

function MentorsSlider(props: MentorsSliderProps) {
  const { t } = useTranslation("translation", { keyPrefix: "components.mentorsSlider" })

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
  useEffect(() => {
    if (!innerRef.current) return
    innerRef.current.scrollTo(innerRef.current.scrollWidth / 2 - innerRef.current.offsetWidth / 2, 0)
  }, [])
  return (
    <div className="mentors-slider">
      <div className="mentors-slider__header">
        <h3 className="heading">{t("title")}</h3>
        <div className="mentors-slider__buttons">
          <ButtonIcon name="arrow-left" size="small" outline onClick={prev} />
          <ButtonIcon name="arrow-right" size="small" outline onClick={next} />
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
        <ButtonLink size="big" color="white" to="/mentors">{t("seeAllMentors")}</ButtonLink>
        <span>{t("or")}</span>
        <Button size="big" outline onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>{t("getHelp")}</Button>
      </div>
    </div>
  )
}


export default MentorsSlider
