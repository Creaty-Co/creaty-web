import "./mentor-cards.scss"

import { bem, classMerge,classWithModifiers } from "@shared/utils"
import { getMentors } from "api/actions/mentors"
import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { MentorType, TagType, TopicType } from "interfaces/types"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useTranslation } from "react-i18next"

export interface IMentorCards {
  topic?: TopicType
  tag?: TagType
}

const CN = "mentor-cards"
const { getElement, getModifier } = bem(CN)

export function MentorCards(props: IMentorCards) {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "other.pagination" })
  const tagSet = props.tag ? [props.tag.id] : props.topic?.tags.map(tag => tag.id) || []

  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<MentorType[]>([])

  const { error, loading, payload, query } = useQuery(getMentors(page, pageSize, tagSet))
  if (error) return <>useQuery error</>

  useEffect(() => { query() }, [i18n.language])
  useEffect(() => {
    setPage(1)
    setResults(payload?.results || [])
  }, [props.topic, props.tag])
  useEffect(() => {
    if (loading || !payload) return
    if (page > 1) {
      setResults(results => [...new Set([...results, ...payload.results])])
      return
    }
    setResults(payload.results)
  }, [page, loading, payload])

  const lastPageSize = (payload?.count || 0) % pageSize
  return (
    <div className="mentor-cards">
      <div className="mentor-cards__container">
        {results.map(mentor => (
          <MentorCard {...mentor} key={mentor.id} />
        ))}
      </div>
      {loading && (
        <LoaderCover absolute white />
      )}
      {(page * pageSize) < (payload?.count || 0) && (
        <Button
          className="mentor-cards__more"
          outline
          size="big"
          iconLeft={<Icon name="refresh" className={classWithModifiers("mentor-cards__icon", loading && "spin")} />}
          disabled={loading}
          onClick={() => setPage(page + 1)}
        >{t("showMore")} {((page * pageSize) + lastPageSize) === (payload?.count || 0) ? lastPageSize : pageSize}</Button>
      )}
    </div>
  )
}
