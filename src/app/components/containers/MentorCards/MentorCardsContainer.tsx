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
  const ll = useLocalization(ll => ll.other.pagination)
  const search = useSelector(state => state.search)


  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<MentorType[]>([])
  const { error, loading, payload, query } = useQuery(getMentors(page, pageSize, search.tag ? [search.tag.id] : search.topic?.tags.map(tag => tag.id) || []))
  if (error) throw new Error("unexpected api error")
  useEffect(() => { !loading && payload && setResults(payload.results) }, [search.tag, search.topic, ll])
  useEffect(() => { query() }, [ll])
  useEffect(() => {
    if (!payload || loading) return
    setResults(results => [...new Set([...results, ...payload.results])])
  }, [payload?.results])


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
        >{ll.showMore} {pageSize}</Button>
      )}
    </div>
  )
}


export default MentorCardsContainer
