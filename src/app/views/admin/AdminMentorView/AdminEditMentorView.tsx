import { getMentorsId } from "api/actions/mentors"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"

import AdminMentorNewEdit from "./AdminMentorNewEdit"


function AdminEditMentorView() {
  const params = useParams<"mentorId">()
  if (!params.mentorId) throw new Error("This component should be used in Route context")

  const { error, loading, payload } = useQuery(getMentorsId(+params.mentorId))
  if (error) throw new Error("unexpected api query error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>

  return (
    <AdminMentorNewEdit id={+params.mentorId} data={payload} />
  )
}


export default AdminEditMentorView
