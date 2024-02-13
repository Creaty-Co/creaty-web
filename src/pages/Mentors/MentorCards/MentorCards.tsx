import "./MentorCards.scss"

import { MentorCard } from "@components/MentorCard/MentorCard"
import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { Icon } from "@shared/ui/Icon/Icon"
import { LoaderCover } from "@shared/ui/LoaderCover/LoaderCover"
import { bem } from "@shared/utils/common"
import { useGetMentorsQuery } from "@store/mentor/mentor.api"
import { IMentor } from "@store/mentor/mentor.types"
import { ICategory, ITag } from "@store/tags/tags.types"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export interface IMentorCards {
  category?: ICategory
  tag?: ITag
}

const CN = "mentor-cards"
const { getElement, getModifier } = bem(CN)

export function MentorCards({ tag, category }: IMentorCards) {
  const { t } = useTranslation("translation", { keyPrefix: "other.pagination" })
  const tagSet = tag ? [tag.id] : category?.tags.map(tag => tag.id) || []

  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [cards, setCards] = useState<IMentor[]>([])

  const { data, isLoading } = useGetMentorsQuery({ page, page_size: pageSize, tag_set__in: tagSet })

  useEffect(() => {
    setPage(1)
    setCards(data?.results || [])
  }, [category, tag])

  useEffect(() => {
    if (isLoading || !data) return
    if (page > 1) return setCards(results => [...new Set([...results, ...data.results])])

    setCards(data.results)
  }, [page, isLoading, data])

  const lastPageSize = (data?.count || 0) % pageSize

  return (
    <div className={CN}>
      <div className={getElement("container")}>
        {cards.map(mentor => (
          <MentorCard {...mentor} key={mentor.id} className="mentors-card-wrapper" clickable />
        ))}
      </div>

      {isLoading && <LoaderCover absolute white />}

      {page * pageSize < (data?.count || 0) && (
        <SharedButton
          className={getElement("more")}
          outline
          size="big"
          disabled={isLoading}
          iconLeft={<Icon name="refresh" className={getModifier(getElement("icon"), isLoading && "spin")} />}
          onClick={() => setPage(page + 1)}
        >
          {t("showMore")} {page * pageSize + lastPageSize === (data?.count || 0) ? lastPageSize : pageSize}
        </SharedButton>
      )}
    </div>
  )
}
