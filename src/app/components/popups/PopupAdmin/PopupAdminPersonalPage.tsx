import "./PopupAdminPersonalPage.scss"

import { getMentors } from "api/actions/mentors"
import { deletePagePersonalMentor, deletePagesMainMentor, patchPagePersonal, patchPagePersonalMentor, patchPagesMain, patchPagesMainMentor } from "api/actions/pages"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import Form, { FormState } from "app/components/UI/Form/Form"
import { MentorType, TagType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { useEffect, useState } from "react"
import { DefaultRootState, useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { formsFetch } from "redux/reducers/forms"

import PopupLayout from "../PopupLayout"
import PopupLayoutChanged from "../PopupLayoutChanged"

interface PopupAdminPersonalTagsProps {
  shortcut?: string
  tags: TagType[]
}

export function PopupAdminPersonalTags(props: PopupAdminPersonalTagsProps) {
  const { close } = useModal()
  const dispatch = useDispatch()
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  enum FormInputs {
    tags = "tags"
  }
  async function onSubmitTags(state: FormState<FormInputs, { tags: number[] }>) {
    const APIAction = props.shortcut ? patchPagePersonal(props.shortcut, state.values) : patchPagesMain(state.values)

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
            <Checkbox name={FormInputs.tags} defaultChecked={!!(props.tags.find(item => item.id === tag.id))} value={tag.id} />
          </label>
        ))}
        <Button color="dark" type="submit">Сохранить</Button>
      </Form>
    </PopupLayout>
  )
}


interface PopupAdminPersonalMentorsProps {
  mentor: Pick<MentorType, "id" | "pages">
}
interface MentorPage {
  id: number
  shortcut: string
  title: string
}

const mainMentorPage: MentorPage = { id: 0, shortcut: "main", title: "Главная страница" }
export function PopupAdminPersonalMentors(props: PopupAdminPersonalMentorsProps) {
  const { close } = useModal()
  const [changedIds, setChangedIds] = useState<number[]>([])
  const [list, setList] = useState<MentorPage[]>([mainMentorPage])
  
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)

  useEffect(() => {
    setList([mainMentorPage])
    setChangedIds([])
  }, [props.mentor.id])

  useEffect(() => {
    setList(prev => [...prev, ...topics.tags])
  }, [props.mentor.id, topics])
  
  const handleClick = (id: number): void => {
    setChangedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      else return [...prev, id]
    })
  }

  const handleSave = (): void => {

    const changed = changedIds.map(id => list.find(item => item.id === id))

    const removedFrom = changed.filter(i => i?.shortcut !== "main" && isChecked(i!)) 
    const addedTo = changed.filter(i => i?.shortcut !== "main" && !isChecked(i!)) 
    
    const main = changed.filter(i => i?.shortcut === "main")[0]
    const mainChanged = !!main
    const mainAdded = mainChanged && !isChecked(main)

    const promises: any[] = []
    
    removedFrom.forEach(i => promises.push(deletePagePersonalMentor(i!.shortcut, props.mentor.id)))
    addedTo.forEach(i => promises.push(patchPagePersonalMentor(i!.shortcut, props.mentor.id)))
  
    if (mainChanged) 
      promises.push(mainAdded
        ? patchPagesMainMentor(props.mentor.id)
        : deletePagesMainMentor(props.mentor.id)
      )

    const promise = Promise.all(promises.map(p => ClientAPI.query(p))).then(r => ClientAPI.query(getMentors(1, 20, [])))

    toast.promise(promise, {
      pending: "Ментор изменяется",
      success: "Ментор отредактирован успешно",
      error: "Произошла ошибка"
    })

    promise.then(r => {
      if (main)
        toast.info(mainAdded
          ? "Ментор добавлен на главную страницу"  
          : "Ментор удалён с главной страницы"  
        )
        
      if (removedFrom.length !== 0)
        toast.info(`Ментор удалён из: ${removedFrom.map(i => i?.shortcut).join(", ")}`)

      if (addedTo.length !== 0)
        toast.info(`Ментор добавлен в: ${addedTo.map(i => i?.shortcut).join(", ")}`)


      const mainPage = mainAdded? [{ id: 1, tag: null, category: null }] : []
        
      const removedIds = removedFrom.map(i => i!.id)
      const pages = props.mentor.pages!.filter(page => !removedIds.includes(page.tag!))
        
      const addedPage = addedTo.map(i => ({ id: null, tag: i!.id, category: null }))
      pages.push(...addedPage)
      
      if (mainChanged) {
        if (mainAdded) {
          props.mentor.pages = [...mainPage, ...pages]
        }
        else {
          props.mentor.pages = [...pages].filter(p => !(p.tag === null && p.category === null))
        }
      } else {
        props.mentor.pages = [...pages]
      }
      
      setChangedIds([])
      close()
    })
  }

  const handleCancel = (): void => {
    setChangedIds([])
  }

  const isChecked = (tag: MentorPage): boolean => {
    if (tag.id === 0)
      return !!props.mentor.pages?.find(page => page.category === null && page.tag === null)
  
    return !!props.mentor.pages?.find(p => p.tag === tag.id) 
  }

  const rChangedTagsContainer = (
    <div className="popup-admin-personal-page__list popup-admin-personal-page__list_changed">
      <div className="popup-admin-personal-page__title popup-admin-personal-page__title_changed">Изменённые:</div>
      {changedIds.map(id => list.find(t => t.id === id)).map(tag => (
        tag && <label key={tag.id}>
          <Checkbox defaultChecked={!isChecked(tag)} onClick={() => handleClick(tag!.id)}>{tag!.title}</Checkbox>
        </label>
      ))}
    </div>
  )

  const rTagsContainer = (
    <div className="popup-admin-personal-page__list">
      {list.filter(t => !changedIds.includes(t.id)).map(tag => (
        <label key={tag.id}>
          <Checkbox defaultChecked={isChecked(tag)} onClick={() => handleClick(tag.id)}>{tag.title}</Checkbox>
        </label>
      ))}
    </div>
  )

  const rControlls = (
    <div className="popup-admin-personal-page__controll">
      <Button onClick={handleSave} color="green" disabled={changedIds.length === 0}>Сохранить</Button>
      <Button onClick={handleCancel} color="dark" disabled={changedIds.length === 0}>Отменить</Button>
    </div>
  )

  return (
    <PopupLayoutChanged controll={rControlls} title="Изменить менторов" width="35em" key={props.mentor.id}>
      <div className="popup-admin-personal-page">
        {!!changedIds.length && rChangedTagsContainer}
        {rTagsContainer}
      </div>
    </PopupLayoutChanged>
  )
}
