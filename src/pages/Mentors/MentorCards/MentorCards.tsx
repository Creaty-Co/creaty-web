import "./MentorCards.scss"

import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { Icon } from "@shared/ui/Icon/Icon"
import { LoaderCover } from "@shared/ui/LoaderCover/LoaderCover"
import { bem } from "@shared/utils/common"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MentorCard } from "src/components/MentorCard/MentorCard"
import { ITag } from "src/components/Tag/Tag.types"
import { useGetMentorsQuery } from "src/store/mentor/mentor.api"
import { MentorType } from "src/store/mentor/mentor.types"
import { ICategory } from "src/store/tags/tags.types"

export interface IMentorCards {
  topic?: ICategory
  tag?: ITag
}

const CN = "mentor-cards"
const { getElement, getModifier } = bem(CN)

export function MentorCards(props: IMentorCards) {
  const { t } = useTranslation("translation", { keyPrefix: "other.pagination" })
  const tagSet = props.tag ? [props.tag.id] : props.topic?.tags.map(tag => tag.id) || []

  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<MentorType[]>([])

  const { data, isLoading } = useGetMentorsQuery({ page, page_size: pageSize, tag_set__in: tagSet })

  useEffect(() => {
    setPage(1)
    setResults(data?.results || [])
  }, [props.topic, props.tag])

  useEffect(() => {
    if (isLoading || !data) return
    if (page > 1) return setResults(results => [...new Set([...results, ...data.results])])

    setResults(data.results)
  }, [page, isLoading, data])

  const lastPageSize = (data?.count || 0) % pageSize

  return (
    <div className={CN}>
      <div className={getElement("container")}>
        {results.map(mentor => (
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
