import "./mentors-slider.scss"

import { useAppDispatch } from "@app/store"
import { MentorCard, MentorType } from "@entities"
import { PopupForm } from "@features"
import { open } from "@shared/layout/modal"
import { Button, ButtonIcon, ButtonLink } from "@shared/ui"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

interface IMentorsSlider {
  mentors: MentorType[]
}

export function MentorsSlider(props: IMentorsSlider) {
  const { t } = useTranslation("translation", { keyPrefix: "components.mentorsSlider" })
  const dispatch = useAppDispatch()

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
          {props.mentors.map((mentor, index) => (
            <MentorCard {...mentor} key={mentor.id + "" + index} />
          ))}
        </div>
      </div>
      <div className="mentors-slider__help">
        <ButtonLink size="big" color="white" to="/mentors">{t("seeAllMentors")}</ButtonLink>
        <span>{t("or")}</span>
        <Button 
          size="big" outline 
          onClick={() => dispatch(open(<PopupForm type="choose_mentor" />))}
        >
          {t("getHelp")}
        </Button>
      </div>
    </div>
  )
}
