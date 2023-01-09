import { useEffect } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { formsFetch } from "redux/reducers/forms"
import { topicsFetch } from "redux/reducers/topics"
import initSentry from "services/sentry"

function AppInit() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation("translation")

  useEffect(() => {
    window.addEventListener("load", () => {
      dispatch(formsFetch)
      dispatch(topicsFetch)
    })
  }, [])

  useEffect(() => {
    dispatch(formsFetch)
    dispatch(topicsFetch)
  }, [i18n.language])

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

initSentry()