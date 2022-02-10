import { getPagePersonal } from "api/actions/pages"
import { useEffect } from "react"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"

import HomeView from "./HomeView"


function HomeViewShortcut() {
  const params = useParams<"shortcut">()
  const { payload } = useQuery(getPagePersonal(params.shortcut || ""), !!params.shortcut)
  useEffect(() => {
    if (!payload) return

  }, [payload])
  if (!payload) return null
  return (
    <HomeView />
  )
}


export default HomeViewShortcut
