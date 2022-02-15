import { deletePagePersonalMentor, deletePagesMainMentor, getPagePersonal, patchPagePersonal, patchPagePersonalMentor, patchPagesMain, patchPagesMainMentor } from "api/actions/pages"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import { MentorType, TagType } from "interfaces/types"
import { usePopup } from "modules/popup/hook"
import { ChangeEvent, FormEvent } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getCheckedValues } from "utils/common"

import PopupLayout from "../PopupLayout"


interface PopupAdminPersonalTagsProps {
  shortcut?: string
  tags: TagType[]
}

export function PopupAdminPersonalTags(props: PopupAdminPersonalTagsProps) {
  const { close } = usePopup()
  const topics = useSelector(state => state.topics)
  async function submitTags(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    interface FormElements extends HTMLFormControlsCollection {
      tags: RadioNodeList & HTMLInputElement[]
    }

    const target = event.currentTarget
    const elements = target.elements as FormElements

    const APIPayload = {
      tags: getCheckedValues(elements.tags).map(Number)
    }
    const APIAction = props.shortcut ? patchPagePersonal(props.shortcut, APIPayload) : patchPagesMain(APIPayload)

    ClientAPI
      .query(APIAction)
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Изменить тэги" width="35em">
      <form onSubmit={submitTags} style={{ display: "grid", rowGap: "1em", color: "black" }}>
        Тэги
        {topics.tags.map(tag => (
          <label key={tag.id}>
            {tag.title}
            <input name="tags" type="checkbox" defaultChecked={!!(props.tags.find(tagg => tagg.id === tag.id))} value={tag.id} />
          </label>
        ))}
        <Button color="dark" type="submit">Сохранить</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminPersonalMentorsProps {
  mentor: Pick<MentorType, "id">
}

export function PopupAdminPersonalMentors(props: PopupAdminPersonalMentorsProps) {
  const topics = useSelector(state => state.topics)
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const shortcut = target.name

    addOrRemoveMentor(target.checked, shortcut)
  }
  function addOrRemoveMentor(isAdding: boolean, shortcut: string) {
    const APIAction =
      isAdding
        ? shortcut === "main" ? patchPagesMainMentor(props.mentor.id) : patchPagePersonalMentor(shortcut, props.mentor.id)
        : shortcut === "main" ? deletePagesMainMentor(props.mentor.id) : deletePagePersonalMentor(shortcut, props.mentor.id)

    ClientAPI
      .query(APIAction)
      .then(({ error }) => {
        if (error) return
        toast.info((isAdding ? "Ментор был добавлен в " : "Ментор был убран из ") + shortcut)
      })
  }
  return (
    <PopupLayout title="Изменить менторов" width="35em">
      <div style={{ display: "grid", rowGap: "1em", color: "black" }}>
        Тэги
        <label>
          Главная
          <Button color="green" onClick={() => addOrRemoveMentor(true, "main")}>Добавить</Button>
          <Button color="violet" onClick={() => addOrRemoveMentor(false, "main")}>Удалить</Button>
          {/* <input name="main" type="checkbox" onChange={onChange} /> */}
        </label>
        {topics.tags.map(tag => (
          <label key={tag.id}>
            {tag.title}
            <Button color="green" onClick={() => addOrRemoveMentor(true, tag.shortcut)}>Добавить</Button>
            <Button color="violet" onClick={() => addOrRemoveMentor(false, tag.shortcut)}>Удалить</Button>
            {/* <input name={tag.shortcut} type="checkbox" onChange={onChange} /> */}
          </label>
        ))}
      </div>
    </PopupLayout>
  )
}
