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
  const tagSet = search.tag ? [search.tag.id] : search.topic?.tags.map(tag => tag.id) || []


  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<MentorType[]>([])

  const { error, loading, payload } = useQuery(getMentors(page, pageSize, tagSet))
  if (error) throw new Error("unexpected api error")

  useEffect(() => {
    setPage(1)
    setResults(payload?.results || [])
  }, [search.topic, search.tag])
  useEffect(() => {
    if (loading || !payload) return
    if (page > 1) {
      setResults(results => [...new Set([...results, ...payload.results])])
      return
    }
    setResults(payload.results)
  }, [page, loading, payload])
  return (
    <div className="mentor-cards">
      <div className={classWithModifiers("mentor-cards__container", loading && "loading")}>
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
    </div >
  )
}


export default MentorCardsContainer
