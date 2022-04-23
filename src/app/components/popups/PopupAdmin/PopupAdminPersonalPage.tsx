import { deletePagePersonalMentor, deletePagesMainMentor, patchPagePersonal, patchPagePersonalMentor, patchPagesMain, patchPagesMainMentor } from "api/actions/pages"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Form, { FormState } from "app/components/UI/Form/Form"
import { MentorType, TagType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { formsFetch } from "redux/reducers/forms"

import PopupLayout from "../PopupLayout"


interface PopupAdminPersonalTagsProps {
  shortcut?: string
  tags: TagType[]
}

export function PopupAdminPersonalTags(props: PopupAdminPersonalTagsProps) {
  const { close } = useModal()
  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  async function onSubmitTags(state: FormState<{ tags: number[] }>) {
    const APIPayload = state.values
    const APIAction = props.shortcut ? patchPagePersonal(props.shortcut, APIPayload) : patchPagesMain(APIPayload)

    const { error } = await ClientAPI.query(APIAction)
    if (error) return

    close()
    dispatch(formsFetch)
  }
  return (
    <PopupLayout title="Изменить тэги" width="35em">
      <Form onSubmit={onSubmitTags} style={{ display: "grid", rowGap: "1em", color: "black" }}>
        Тэги
        {topics.tags.map(tag => (
          <label key={tag.id}>
            {tag.title}
            <input name="tags" type="checkbox" defaultChecked={!!(props.tags.find(tagg => tagg.id === tag.id))} value={tag.id} />
          </label>
        ))}
        <Button color="dark" type="submit">Сохранить</Button>
      </Form>
    </PopupLayout>
  )
}


interface PopupAdminPersonalMentorsProps {
  mentor: Pick<MentorType, "id">
}

export function PopupAdminPersonalMentors(props: PopupAdminPersonalMentorsProps) {
  const topics = useSelector(state => state.topics)
  async function addOrRemoveMentor(isAdding: boolean, shortcut: string) {
    const APIAction =
      isAdding
        ? shortcut === "main" ? patchPagesMainMentor(props.mentor.id) : patchPagePersonalMentor(shortcut, props.mentor.id)
        : shortcut === "main" ? deletePagesMainMentor(props.mentor.id) : deletePagePersonalMentor(shortcut, props.mentor.id)

    const { error } = await ClientAPI.query(APIAction)
    if (error) return

    toast.info((isAdding ? "Ментор был добавлен в " : "Ментор был убран из ") + shortcut)
  }
  return (
    <PopupLayout title="Изменить менторов" width="35em">
      <div style={{ display: "grid", rowGap: "1em", color: "black" }}>
        Тэги
        <div>
          Главная
          <Button color="green" await onClick={async () => await addOrRemoveMentor(true, "main")}>Добавить</Button>
          <Button color="violet" await onClick={async () => await addOrRemoveMentor(false, "main")}>Удалить</Button>
          {/* <input name="main" type="checkbox" onChange={onChange} /> */}
        </div>
        {topics.tags.map(tag => (
          <div key={tag.id}>
            {tag.title}
            <Button color="green" await onClick={async () => await addOrRemoveMentor(true, tag.shortcut)}>Добавить</Button>
            <Button color="violet" await onClick={async () => await addOrRemoveMentor(false, tag.shortcut)}>Удалить</Button>
            {/* <input name={tag.shortcut} type="checkbox" onChange={onChange} /> */}
          </div>
        ))}
      </div>
    </PopupLayout>
  )
}
