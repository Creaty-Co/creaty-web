import "./MentorsSlider.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { PopupFormWrapper } from "@components/forms/old/PopupForm/PopupFormWrapper"
import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { SharedButtonIcon } from "@shared/ui/buttons/SharedButtonIcon"
import { SharedButtonLink } from "@shared/ui/buttons/SharedButtonLink"
import { bem } from "@shared/utils/common"
import { EFormIds } from "@store/forms/form.types"
import { IMentor } from "@store/mentor/mentor.types"
import { openModal } from "@store/modalContainer.slice"
import { useAppDispatch } from "@store/store"
import cn from "classnames"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import Slider from "react-slick"

import { MentorCard } from "../MentorCard/MentorCard"

interface IMentorsSlider {
  mentors: IMentor[]
}

const CN = "mentors-slider"
const { getElement } = bem(CN)

export function MentorsSlider({ mentors }: IMentorsSlider) {
  const { t } = useTranslation("translation", { keyPrefix: "components.mentorsSlider" })
  const dispatch = useAppDispatch()

  const slider = useRef<Slider>(null)
  const mentorCardsCount = Math.floor(window.innerWidth / 380) || 1

  const prev = () => slider.current?.slickPrev()
  const next = () => slider.current?.slickNext()
  
  return (
    <div className={CN}>
      <div className={getElement("header")}>
        <div className={cn(getElement("heading"), "heading")}>{t("title")}</div>

        <div className={getElement("buttons")}>
          <SharedButtonIcon name="arrow-left" size="small" outline onClick={prev} />
          <SharedButtonIcon name="arrow-right" size="small" outline onClick={next} />
        </div>
      </div>

      <div className={getElement("container")}>
        <Slider
          className="slider variable-width"
          infinite
          dots={false}
          arrows={false}
          slidesToShow={mentors.length < mentorCardsCount ? mentors.length : mentorCardsCount}
          slidesToScroll={mentors.length < mentorCardsCount ? mentors.length : mentorCardsCount}
          swipeToSlide
          variableWidth
          accessibility
          // autoplay
          // speed={1000}
          // autoplaySpeed={5000}
          // pauseOnHover
          ref={slider}
        >
          {mentors.map(mentor => (
            <MentorCard {...mentor} key={mentor.id} className="slider-card-wrapper" clickable />
          ))}
        </Slider>
      </div>

      <div className={getElement("help")}>
        <SharedButtonLink size="big" color="white" to="/mentors">
          {t("seeAllMentors")}
        </SharedButtonLink>

        <span>{t("or")}</span>

        <SharedButton
          size="big"
          outline
          onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
        >
          {t("getHelp")}
        </SharedButton>
      </div>
    </div>
  )
}
