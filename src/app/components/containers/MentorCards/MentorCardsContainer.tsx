import "./MentorCards.scss"

import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { useState } from "react"
import { classWithModifiers } from "utils/common"


function MentorCardsContainer() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const loading = true
  return (
    <div className="mentor-cards">
      <div className="mentor-cards__container">
        {[...Array(pageSize)].map((_, index) => (
          <MentorCard key={index} />
        ))}
      </div>
      <Button
        className="mentor-cards__more"
        style="outline"
        size="big"
        iconLeft={<Icon name="refresh" className={classWithModifiers("mentor-cards__icon", loading && "spin")} />}
        disabled={loading}
      >Покакзать ещё {pageSize}</Button>
    </div>
  )
}


export default MentorCardsContainer
