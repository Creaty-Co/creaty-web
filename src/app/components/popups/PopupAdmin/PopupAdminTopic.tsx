import { deleteTagsTopic, patchTagsTopics, postTagsTopics } from "api/actions/tags"
import ClientAPI from "api/client"
import Form, { FormState } from "app/components/UI/Form/Form"
import AdminInputsLayout from "app/layouts/AdminInputsLayout"
import { URLDataBase64, ValuesOf } from "interfaces/common"
import { TopicType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { topicsFetch } from "redux/reducers/topics"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


export function PopupAdminNewTopic() {
  const { close } = useModal()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  enum FormInputs {
    titleRU = "title_ru",
    titleEN = "title_en",
    shortcut = "shortcut",
    icon = "icon"
  }
  type FormValues = Record<ValuesOf<typeof FormInputs>, string>

  async function onSubmitTopic(_event: FormEvent<HTMLFormElement>, state: FormState<FormValues>) {
    setPending(true)
    const { error } = await ClientAPI.query(postTagsTopics(state.values))
    setPending(false)
    if (error) return

    dispatch(topicsFetch)
    close()
  }

  return (
    <PopupLayout title="Добавить категорию">
      <Form onSubmit={onSubmitTopic}>
        <AdminInputsLayout>
          <Input className="admin-header-input-markers" name={FormInputs.titleRU} placeholder="Название на русском" />
          <Input className="admin-header-input-markers" name={FormInputs.titleEN} placeholder="Название на английском" />
          <Input name={FormInputs.shortcut} placeholder="Ярлык" />
          <label>
            Иконка в .svg
            <Input name={FormInputs.icon} type="file" />
          </label>
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Добавить</Button>
      </Form>
    </PopupLayout>
  )
}


interface PopupAdminEditTopicProps {
  topic: TopicType
}

export function PopupAdminEditTopic(props: PopupAdminEditTopicProps) {
  const { close } = useModal()
  const dispatch = useDispatch()
  const [pending, setPending] = useState(false)

  enum FormInputs {
    title = "title",
    shortcut = "shortcut",
    icon = "icon"
  }
  type FormValues = Record<ValuesOf<typeof FormInputs>, string> & { icon?: URLDataBase64 }

  async function onSubmitTopic(_event: FormEvent<HTMLFormElement>, state: FormState<FormValues>) {
    setPending(true)
    const { error } = await ClientAPI.query(patchTagsTopics(props.topic.id, state.values))
    setPending(false)
    if (error) return

    dispatch(topicsFetch)
    close()
  }
  async function removeTopic() {
    if (props.topic.tags.length > 0) {
      const canDelete = await window.confirm("Категория имеет теги, всё равно удалить?")
      if (!canDelete) return
    }

    const { error } = await ClientAPI.query(deleteTagsTopic(props.topic.id))
    if (error) return

    dispatch(topicsFetch)
    close()
  }
  return (
    <PopupLayout title="Редактировать категорию">
      <Form onSubmit={onSubmitTopic}>
        <AdminInputsLayout>
          <Input className="admin-header-input-markers" name={FormInputs.title} placeholder="Название на выбраном языке" defaultValue={props.topic.title} key={props.topic.title} />
          <Input name={FormInputs.shortcut} placeholder="Ярлык" defaultValue={props.topic.shortcut} key={props.topic.shortcut} />
          <label>
            Иконка в .svg
            <Input name={FormInputs.icon} type="file" />
          </label>
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Сохранить</Button>
        <Button color="violet" await onClick={removeTopic}>Удалить</Button>
      </Form>
    </PopupLayout>
  )
}
