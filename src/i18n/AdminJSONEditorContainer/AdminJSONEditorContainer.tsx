import "jsoneditor/dist/jsoneditor.min.css"
import "./AdminJSONEditorContainer.scss"

import { isAdminS } from "@store/auth/auth.slice"
import { useAppSelector } from "@store/store"
import i18next from "i18next"
import { useNavigate } from "react-router"

import { ReactJSONEditorContainer } from "./ReactJSONEditorContainer"

export function AdminJSONEditorContainer() {
  const isAdmin = useAppSelector(isAdminS)
  const navigate = useNavigate()

  if (!isAdmin) return null

  return <ReactJSONEditorContainer i18n={i18next} navigate={navigate} />
}
