import "jsoneditor/dist/jsoneditor.min.css"
import "./ReactJSONEditorContainer.scss"

import Button from "app/components/common/Button/Button"
import LangSelector from "app/components/UI/LangSelector/LangSelector"
import { BackendOptions,i18n, ResourceLanguage } from "i18next"
// import { BackendOptions,i18n, ResourceLanguage } from "i18next"
import JSONEditor, { JSONEditorOptions } from "jsoneditor"
import { Component, createRef } from "react"

interface JSONEditorContainerProps {
  i18n: i18n
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
    }
  }
  editor: JSONEditor | null = null
  editorContainerRef = createRef<HTMLDivElement>()

  componentDidMount() {
    if (this.editorContainerRef.current === null) return
    this.initEditor(this.editorContainerRef.current)

    const rootElement = document.getElementById("root")
    if (rootElement === null) {
      throw new Error("no #root element found")
    }

    rootElement.style.maxWidth = "75vw"

    const i18n = this.props.i18n
    i18n.reloadResources((i18n.options.supportedLngs || []).slice(0, -1), "translation")
    i18n.on("languageChanged", () => {
      const resourceKey = i18n.store.data[i18n.language]["translation"]

      this.editor?.set(resourceKey)
    })
  }

  componentWillUnmount() {
    const rootElement = document.getElementById("root")
    if (rootElement === null) {
      throw new Error("no #root element found")
    }

    rootElement.removeAttribute("style")
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
    if (put == null) return


    await put(i18n.language, "translation", data)

    alert("Successfully updated")
  }

  onChangeJSON(json: string) {
    const i18n = this.props.i18n

    i18n.store.data[i18n.language]["translation"] = JSON.parse(json)
    i18n.emit("react-refresh")
  }

  render() {
    return (
      <div className="react-json-editor">
        <LangSelector />
        <div className="react-json-editor__editor" ref={this.editorContainerRef}></div>
        <div className="react-json-editor__toolbar">
          <Button color="white" onClick={this.putUpdate.bind(this)}>Save</Button>
        </div>
      </div>
    )
  }
}

export default ReactJSONEditorContainer
