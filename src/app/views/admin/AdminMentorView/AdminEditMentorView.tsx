import { getMentorBySlug } from "api/actions/mentors"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"

import AdminMentorNewEdit from "./AdminMentorNewEdit"


function AdminEditMentorView() {
  const params = useParams<"mentorSlug">()
  if (!params.mentorSlug) throw new Error("This component should be used in Route context")

  const { error, loading, payload } = useQuery(getMentorBySlug(params.mentorSlug))
  if (error) return <>useQuery error</>
  if (loading) return <LoaderCover />
  if (!payload) return <>no content</>

  return (
    <AdminMentorNewEdit slug={params.mentorSlug} data={payload} />
  )
}


export default AdminEditMentorView
