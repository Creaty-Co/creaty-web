import { patchPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import useClickAway from "hooks/useClickAway"
import { FormElements } from "interfaces/common"
import { Children, FormEvent, ReactElement, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils/common"

import Button from "../common/Button/Button"
import AdminInterface from "./AdminInterface"


const acceptedAPIActions = {
  links: patchPagesLinksDocuments,
} as const

interface AdminEditableValueProps {
  id: string | number
  editingArea: keyof typeof acceptedAPIActions
  defaultValue?: string
  children: ReactElement
}

function AdminEditableValue(props: AdminEditableValueProps) {
  const admin = useSelector(state => state.admin)
  if (admin.editing) {
    return (
      <AdminEditableValueContainer {...props} />
    )
  }
  return props.children
}

function AdminEditableValueContainer(props: AdminEditableValueProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const child = Children.only(props.children)
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"field">
    const APIAction = acceptedAPIActions[props.editingArea](+props.id, elements.field.value)

    ClientAPI
      .query(APIAction)
      .then(({ error }) => {
        if (error) return
        setExpanded(false)
      })
  }
  useClickAway(parentRef, () => setExpanded(false))
  return (
    <div className="admin-editable-value" onClick={() => setExpanded(true)} ref={parentRef}>
      <div className="admin-editable-value__child">
        {child}
      </div>
      <form className={classWithModifiers("admin-editable-value__form", expanded && "expanded")} onSubmit={onSubmit}>
        <input className="admin-editable-value__input" type="text" name="field" defaultValue={props.defaultValue} />
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  )
}


export default AdminEditableValue
