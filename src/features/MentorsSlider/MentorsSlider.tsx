import "./MentorsSlider.scss"

import { useAppDispatch } from "@app/store"
import { MentorCard, MentorType } from "@entities"
import { PopupFormWrapper } from "@features"
import { openModal } from "@shared/layout"
import { Button, ButtonIcon, ButtonLink } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

interface IMentorsSlider {
  mentors: MentorType[]
}

const CN = "mentors-slider"
const { getElement } = bem(CN)

export function MentorsSlider(props: IMentorsSlider) {
  const { t } = useTranslation("translation", { keyPrefix: "components.mentorsSlider" })
  const dispatch = useAppDispatch()

  const innerRef = useRef<HTMLDivElement>(null)
  const prev = () => slideBy(-1)
  const next = () => slideBy(+1)

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
      left: scrollInterval * by,
    })
  }

  useEffect(() => {
    if (!innerRef.current) return
    innerRef.current.scrollTo(innerRef.current.scrollWidth / 2 - innerRef.current.offsetWidth / 2, 0)
  }, [])

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
        <div className={getElement("inner")} ref={innerRef}>
          {props.mentors.map((mentor, index) => (
            <MentorCard {...mentor} key={mentor.id + "" + index} />
          ))}
        </div>
      </div>

      <div className={getElement("help")}>
        <ButtonLink size="big" color="white" to="/mentors">
          {t("seeAllMentors")}
        </ButtonLink>

        <span>{t("or")}</span>

        <Button size="big" outline onClick={() => dispatch(openModal(<PopupFormWrapper formType="choose_mentor" />))}>
          {t("getHelp")}
        </Button>
      </div>
    </div>
  )
}
