import { deleteTags, patchTags, postTags } from "api/actions/tags"
import ClientAPI from "api/client"
import { FormElements } from "interfaces/common"
import { TagType } from "interfaces/types"
import { usePopup } from "modules/popup/hook"
import { FormEvent } from "react"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


interface PopupAdminNewTagProps {
  topicId: number
}

export function PopupAdminNewTag(props: PopupAdminNewTagProps) {
  const { close } = usePopup()
  function submitTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"title_ru" | "title_en" | "shortcut" | "icon">

    ClientAPI
      .query(postTags(props.topicId, {
        shortcut: elements.shortcut.value,
        title_ru: elements.title_ru.value,
        title_en: elements.title_en.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Добавить тэг">
      <form onSubmit={submitTag}>
        <Input name="title_ru" placeholder="Название на русском" />
        <Input name="title_en" placeholder="Название на английском" />
        <Input name="shortcut" placeholder="Ярлык" />
        <Button color="dark" type="submit">Добавить</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminEditTagProps {
  tag: TagType
}

export function PopupAdminEditTag(props: PopupAdminEditTagProps) {
  const { close } = usePopup()
  function deleteTag() {
    ClientAPI
      .query(deleteTags(props.tag.id))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  function submitTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"title" | "shortcut" | "icon">

    ClientAPI
      .query(patchTags(props.tag.id, {
        shortcut: elements.shortcut.value,
        title: elements.title.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Редактироть тэг">
      <form onSubmit={submitTag}>
        <Input name="title" placeholder="Название на выбраном языке" defaultValue={props.tag?.title} key={props.tag?.title} />
        <Input name="shortcut" placeholder="Ярлык" defaultValue={props.tag?.shortcut} key={props.tag.shortcut} />
        <Button color="dark" type="submit">Сохранить</Button>
        <Button color="violet" onClick={deleteTag}>Удалить</Button>
      </form>
    </PopupLayout>
  )
}
