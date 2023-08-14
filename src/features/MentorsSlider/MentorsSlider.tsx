import "./MentorsSlider.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { useAppDispatch } from "@app/store"
import { MentorCard, MentorType } from "@entities"
import { EFormIds, PopupFormWrapper } from "@features"
import { openModal } from "@shared/layout"
import { Button, ButtonIcon, ButtonLink } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import Slider from "react-slick"

interface IMentorsSlider {
  mentors: MentorType[]
}

const CN = "mentors-slider"
const { getElement } = bem(CN)

export function MentorsSlider({ mentors }: IMentorsSlider) {
  const { t } = useTranslation("translation", { keyPrefix: "components.mentorsSlider" })
  const dispatch = useAppDispatch()

  const slider = useRef<Slider>(null)
  const mentorCardsCount = Math.floor(window.innerWidth / 380)

  const prev = () => slider.current?.slickPrev()
  const next = () => slider.current?.slickNext()
  return (
    <div className={CN}>
      <div className={getElement("header")}>
        <div className={cn(getElement("heading"), "heading")}>{t("title")}</div>

        <div className={getElement("buttons")}>
          <ButtonIcon name="arrow-left" size="small" outline onClick={prev} />
          <ButtonIcon name="arrow-right" size="small" outline onClick={next} />
        </div>
      </div>

      <div className={getElement("container")}>
        <Slider
          className="slider variable-width"
          infinite
          dots={false}
          arrows={false}
          slidesToScroll={mentorCardsCount}
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
        <ButtonLink size="big" color="white" to="/mentors">
          {t("seeAllMentors")}
        </ButtonLink>

        <span>{t("or")}</span>

        <Button
          size="big"
          outline
          onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
        >
          {t("getHelp")}
        </Button>
      </div>
    </div>
  )
}
