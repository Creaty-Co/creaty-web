import "jsoneditor/dist/jsoneditor.min.css"
import "./AdminJSONEditorContainer.scss"

import { useAppSelector } from "@app/store"
import { selectAuthUsersData, selectIsAuth, selectIsAuthLoading } from "@features/users/users.slice"
import { Button } from "@shared/ui"
import i18next, { BackendOptions, i18n } from "i18next"
import JSONEditor, { JSONEditorOptions } from "jsoneditor"
import { Component, createRef, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router"

function AdminJSONEditorContainer() {
  const isAuthLoading = useAppSelector(selectIsAuthLoading)
  const isAuth = useAppSelector(selectIsAuth)
  const authUsersData = useAppSelector(selectAuthUsersData)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth === null) return
    if ((!isAuth && !isAuthLoading) || !authUsersData.isAdmin) navigate("/")
  }, [isAuth, isAuthLoading, authUsersData])

  if ((!isAuth && !isAuthLoading) || !authUsersData.isAdmin) return null

  return <ReactJSONEditorContainer i18n={i18next} navigate={navigate} />
}
interface JSONEditorContainerProps {
  i18n: i18n
  navigate: NavigateFunction
  options?: JSONEditorOptions
}

class ReactJSONEditorContainer extends Component<JSONEditorContainerProps> {
  /**
   * Default options
   */
  options: JSONEditorOptions = {
    mode: process.env.NODE_ENV === "development" ? "code" : "tree",
    onChangeText: this.onChangeJSON.bind(this),
    onEditable() {
      return { field: process.env.NODE_ENV === "development", value: true }
    },
  }
  editor: JSONEditor | null = null
  editorContainerRef = createRef<HTMLDivElement>()

  componentDidMount() {
    if (this.editorContainerRef.current === null) return
    this.initEditor(this.editorContainerRef.current)

    const i18n = this.props.i18n
    i18n.reloadResources((i18n.options.supportedLngs || []).slice(0, -1), "translation")
    i18n.on("languageChanged", () => {
      const resourceKey = i18n.store.data[i18n.language]["translation"]

      this.editor?.set(resourceKey)
    })
  }

  initEditor(container: HTMLDivElement) {
    if (this.editor) return

    const i18n = this.props.i18n
    const options: JSONEditorOptions = { ...this.options, ...this.props.options }
    const editor = new JSONEditor(container, options, i18n.store.data[i18n.language]["translation"])

    this.editor = editor
  }

  async putUpdate() {
    const data = this.editor?.get()
    if (data == null) return

    const i18n = this.props.i18n
    const put = (i18n.options.backend as BackendOptions).put

    if (!put) return

    const response = await put(i18n.language, "translation", data)
    console.log("response: ", response)
    if (response?.message) {
      alert(
        `❌ Translation JSON wasn't updated. 

         ❓ Reason: ` + response?.message
      )
      return
    }
    alert(`✅ Translation JSON was successfully updated`)
  }

  onChangeJSON(json: string) {
    const i18n = this.props.i18n

    i18n.store.data[i18n.language]["translation"] = JSON.parse(json)
    i18n.emit("react-refresh")
  }

  render() {
    return (
      <div className="react-json-editor">
        <div className="react-json-editor__editor" ref={this.editorContainerRef}></div>
        <div className="react-json-editor__toolbar">
          <Button color="white" onClick={this.putUpdate.bind(this)}>
            Save
          </Button>
          <Button color="white" onClick={() => this.props.navigate("/")}>
            Go to the Home page
          </Button>
        </div>
      </div>
    )
  }
}

export default AdminJSONEditorContainer
