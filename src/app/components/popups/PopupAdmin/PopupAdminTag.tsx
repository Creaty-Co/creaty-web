import { deleteTags, patchTags, postTags } from "api/actions/tags"
import ClientAPI from "api/client"
import Form, { FormState } from "app/components/UI/Form/Form"
import AdminInputsLayout from "app/layouts/AdminInputsLayout"
import { ValuesOf } from "interfaces/common"
import { TagType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { topicsFetch } from "redux/reducers/topics"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


interface PopupAdminNewTagProps {
  topicId: number
}

export function PopupAdminNewTag(props: PopupAdminNewTagProps) {
  const { close } = useModal()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  enum FormInputs {
    titleRU = "title_ru",
    titleEN = "title_en",
    shortcut = "shortcut"
  }

  async function onSubmitTag(state: FormState<FormInputs, string>) {
    setPending(true)
    const { error } = await ClientAPI.query(postTags(props.topicId, state.values))
    setPending(false)
    if (error) return

    dispatch(topicsFetch)
    close()
  }
  return (
    <PopupLayout title="Добавить тэг">
      <Form onSubmit={onSubmitTag}>
        <AdminInputsLayout>
          <Input name={FormInputs.titleRU} placeholder="Название на русском" />
          <Input name={FormInputs.titleEN} placeholder="Название на английском" />
          <Input name={FormInputs.shortcut} placeholder="Ярлык" />
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Добавить</Button>
      </Form>
    </PopupLayout>
  )
}


interface PopupAdminEditTagProps {
  tag: TagType
}

export function PopupAdminEditTag(props: PopupAdminEditTagProps) {
  const { close } = useModal()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  enum FormInputs {
    title = "title",
    shortcut = "shortcut"
  }

  async function onSubmitTag(state: FormState<FormInputs, string>) {
    setPending(true)
    const { error } = await ClientAPI.query(patchTags(props.tag.id, state.values))
    setPending(false)
    if (error) return

    dispatch(topicsFetch)
    close()
  }
  async function deleteTag() {
    const { error } = await ClientAPI.query(deleteTags(props.tag.id))
    if (error) return

    dispatch(topicsFetch)
    close()
  }
  return (
    <PopupLayout title="Редактироть тэг">
      <Form onSubmit={onSubmitTag}>
        <AdminInputsLayout>
          <Input name={FormInputs.title} placeholder="Название на выбраном языке" defaultValue={props.tag?.title} key={props.tag?.title} />
          <Input name={FormInputs.shortcut} placeholder="Ярлык" defaultValue={props.tag?.shortcut} key={props.tag.shortcut} />
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Сохранить</Button>
        <Button color="violet" await onClick={deleteTag}>Удалить</Button>
      </Form>
    </PopupLayout>
  )
}
