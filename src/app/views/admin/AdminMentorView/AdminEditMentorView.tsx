import { getMentorsId } from "api/actions/mentors"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"

import AdminMentorNewEdit from "./AdminMentorNewEdit"


function AdminEditMentorView() {
  const params = useParams<"mentorId">()
  if (!params.mentorId) throw new Error("This component should be used in Route context")

  const { error, loading, payload } = useQuery(getMentorsId(+params.mentorId))
  if (error) return <>useQuery error</>
  if (loading) return <LoaderCover />
  if (!payload) return <>no content</>

  return (
    <AdminMentorNewEdit id={+params.mentorId} data={payload} />
  )
}


export default AdminEditMentorView
