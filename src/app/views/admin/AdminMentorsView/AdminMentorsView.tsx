// import ""

import { getMentors } from "api/actions/mentors"
import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import MentorCard from "app/components/UI/MentorCard/MentorCard"
import { useState } from "react"
import { useQuery } from "react-fetching-library"


function AdminMentorsView() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const { payload } = useQuery(getMentors(page, pageSize, []))
  if (!payload) return null
  return (
    <div className="admin-view">
      <ButtonLink color="dark" to="/admin/new-mentor">Добавить ментора</ButtonLink>
      <div className="admin-view__entries admin-view__entries--grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {payload.results.map(mentor => (
          <MentorCard {...mentor} key={mentor.id} />
        ))}
      </div>
      <Button color="dark" onClick={() => setPage(page - 1)}>Сюда</Button>
      <Button color="dark" onClick={() => setPage(page + 1)}>Туда</Button>
    </div>
  )
}


export default AdminMentorsView
