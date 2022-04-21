import Localization from "modules/localization/controller"
import { useEffect } from "react"
import ReactGA from "react-ga4"
import { useDispatch } from "react-redux"
import { formsFetch } from "redux/reducers/forms"
import { topicsFetch } from "redux/reducers/topics"

function AppInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener("load", () => {
      dispatch(formsFetch)
      dispatch(topicsFetch)
    })
    Localization.onTransition(() => {
      dispatch(formsFetch)
      dispatch(topicsFetch)
    })
  }, [])

  return null
}

export default AppInit


if (process.env.REACT_APP_API_GA) {
  ReactGA.initialize(process.env.REACT_APP_API_GA)
} else {
  const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
  alert(message)
  console.warn(message)
}