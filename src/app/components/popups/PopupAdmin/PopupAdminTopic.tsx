import { deleteTagsTopic, patchTagsTopics, postTagsTopics } from "api/actions/tags"
import ClientAPI from "api/client"
import AdminInputsLayout from "app/layouts/AdminInputsLayout"
import { FormElements } from "interfaces/common"
import { TopicType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { FormEvent, useState } from "react"
import { requestTags, requestTopics } from "redux/reducers/topics"
import { FileToURLDataBase64 } from "utils/common"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


export function PopupAdminNewTopic() {
  const { close } = useModal()
  const [pending, setPending] = useState(false)
  async function submitTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"title_ru" | "title_en" | "shortcut" | "icon">

    setPending(true)
    const { error } = await ClientAPI.query(postTagsTopics({
      shortcut: elements.shortcut.value,
      title_ru: elements.title_ru.value,
      title_en: elements.title_en.value,
      icon: elements.icon.files?.[0] ? await FileToURLDataBase64(elements.icon.files?.[0]) : ""
    }))
    if (error) return

    await requestTopics()
    await requestTags()

    setPending(false)
    close()
  }

  return (
    <PopupLayout title="Добавить категорию">
      <form onSubmit={submitTopic}>
        <AdminInputsLayout>
          <Input className="admin-header-input-markers" name="title_ru" placeholder="Название на русском" />
          <Input className="admin-header-input-markers" name="title_en" placeholder="Название на английском" />
          <Input name="shortcut" placeholder="Ярлык" />
          <label>
            Иконка в .svg
            <Input name="icon" type="file" />
          </label>
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Добавить</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminEditTopicProps {
  topic: TopicType
}

export function PopupAdminEditTopic(props: PopupAdminEditTopicProps) {
  const { close } = useModal()
  const [pending, setPending] = useState(false)
  async function submitTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"title" | "shortcut" | "icon">

    setPending(true)
    const { error } = await ClientAPI.query(patchTagsTopics(props.topic.id, {
      shortcut: elements.shortcut.value,
      title: elements.title.value,
      icon: elements.icon.files?.[0] ? await FileToURLDataBase64(elements.icon.files?.[0]) : undefined
    }))
    if (error) return
    await requestTopics()
    await requestTags()

    setPending(false)
    close()
  }
  async function removeTopic() {
    if (props.topic.tags.length > 0) {
      const canDelete = await window.confirm("Категория имеет теги, всё равно удалить?")
      if (!canDelete) return
    }

    ClientAPI
      .query(deleteTagsTopic(props.topic.id))
      .then(({ error }) => {
        if (error) return
        (async () => {
          await requestTopics()
          await requestTags()
          close()
        })
      })
  }
  return (
    <PopupLayout title="Редактировать категорию">
      <form onSubmit={submitTopic}>
        <AdminInputsLayout>
          <Input className="admin-header-input-markers" name="title" placeholder="Название на выбраном языке" defaultValue={props.topic.title} key={props.topic.title} />
          <Input name="shortcut" placeholder="Ярлык" defaultValue={props.topic.shortcut} key={props.topic.shortcut} />
          <label>
            Иконка в .svg
            <Input name="icon" type="file" />
          </label>
        </AdminInputsLayout>
        <br />
        <Button color="dark" type="submit" pending={pending}>Сохранить</Button>
        <Button color="violet" await onClick={removeTopic}>Удалить</Button>
      </form>
    </PopupLayout>
  )
}
