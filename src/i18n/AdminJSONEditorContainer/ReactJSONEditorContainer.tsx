import "jsoneditor/dist/jsoneditor.min.css"
import "./AdminJSONEditorContainer.scss"

import { Button } from "antd"
import { i18n } from "i18next"
import JSONEditor, { JSONEditorMode, JSONEditorOptions } from "jsoneditor"
import { Component, createRef } from "react"
import { NavigateFunction } from "react-router"

import { updateTranslationRequest } from "./util"

interface JSONEditorContainerProps {
  i18n: i18n
  navigate: NavigateFunction
  options?: JSONEditorOptions
}

export class ReactJSONEditorContainer extends Component<JSONEditorContainerProps> {
  options: JSONEditorOptions = {
    mode: process.env.NODE_ENV === "development" ? "code" : "tree",
    modes: ["code", "tree"],
    onChangeText: this.onChangeJSON.bind(this),
    onModeChange: this.onModeChange.bind(this),
    onEditable() {
      return true
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

  async updateTranslation() {
    const data = this.editor?.get()
    if (data == null) return
    const i18n = this.props.i18n

    const response = await updateTranslationRequest(i18n.language, "translation", data)
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

  onModeChange(mode: JSONEditorMode) {
    return mode
  }

  render() {
    return (
      <div className="react-json-editor">
        <div className="react-json-editor__editor" ref={this.editorContainerRef}></div>
        <div className="react-json-editor__toolbar">
          <Button color="white" onClick={this.updateTranslation.bind(this)}>
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
