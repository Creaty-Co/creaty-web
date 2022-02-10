import "./MentorCards.scss"

import { getMentors } from "api/actions/mentors"
import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { MentorType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils/common"


function MentorCardsContainer() {
  const lang = useLocalization(ll => ll.lang)
  const search = useSelector(state => state.search)

  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<MentorType[]>([])
  const { error, loading, payload, query } = useQuery(getMentors(page, pageSize, search.topic?.tags.map(tag => tag.id) || [search.tag?.id]))
  if (error) throw new Error("unexpected api error")
  useEffect(() => { !loading && setResults([]) }, [search.tag, search.topic, lang, loading])
  useEffect(() => { query() }, [lang])
  useEffect(() => {
    if (!payload || loading) return
    setResults(results => [...results, ...payload.results])
  }, [payload, loading])
  return (
    <div className="mentor-cards">
      <div className="mentor-cards__container">
        {results.map(mentor => (
          <MentorCard {...mentor} key={mentor.id} />
        ))}
      </div>
      {(page * pageSize) < (payload?.count || 0) && (
        <Button
          className="mentor-cards__more"
          style="outline"
          size="big"
          iconLeft={<Icon name="refresh" className={classWithModifiers("mentor-cards__icon", loading && "spin")} />}
          disabled={loading}
          onClick={() => setPage(page + 1)}
        >Покакзать ещё {pageSize}</Button>
      )}
    </div>
  )
}


export default MentorCardsContainer
