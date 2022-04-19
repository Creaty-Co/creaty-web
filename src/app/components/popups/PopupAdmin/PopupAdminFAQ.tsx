import { deletePagesFAQs, patchPagesFAQs, postPagesFAQs } from "api/actions/pages"
import ClientAPI from "api/client"
import { FormElements } from "interfaces/common"
import { PageFAQType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { FormEvent } from "react"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


export function PopupAdminNewFAQ() {
  const { close } = useModal()
  async function submitFAQ(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"question" | "answer">

    ClientAPI
      .query(postPagesFAQs({
        question: elements.question.value,
        answer: elements.answer.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Добавить FAQ" width="80em">
      <form onSubmit={submitFAQ}>
        <Input name="question" placeholder="Вопрос на выбраном языке" />
        <div className="input">
          <textarea className="input__input" rows={10} name="answer" placeholder="Ответ на выбраном языке" />
        </div>
        <Button color="dark" type="submit">Добавить</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminEditFAQProps {
  faq: PageFAQType
}

export function PopupAdminEditFAQ(props: PopupAdminEditFAQProps) {
  const { close } = useModal()
  function deleteFAQ() {
    ClientAPI
      .query(deletePagesFAQs(props.faq.id))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  async function submitFAQ(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"question" | "answer">

    ClientAPI
      .query(patchPagesFAQs(props.faq.id, {
        question: elements.question.value,
        answer: elements.answer.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Редактировать FAQ" width="80em">
      <form onSubmit={submitFAQ}>
        <Input name="question" placeholder="Вопрос на выбраном языке" defaultValue={props.faq.question} key={props.faq.question} />
        <div className="input">
          <textarea className="input__input" rows={10} name="answer" placeholder="Ответ на выбраном языке" defaultValue={props.faq.answer} key={props.faq.answer} />
        </div>
        <Button color="dark" type="submit">Сохранить</Button>
        <Button color="violet" onClick={deleteFAQ}>Удалить</Button>
      </form>
    </PopupLayout>
  )
}
