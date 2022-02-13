import { getMailing, postMailings, postMailingSend } from "api/actions/mailings"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"
import { FormElements } from "interfaces/common"
import { MailingPreviewType } from "interfaces/types"
import { usePopupContext } from "modules/popup/hook"
import { FormEvent } from "react"
import { useQuery } from "react-fetching-library"

import PopupLayout from "../PopupLayout"


export function PopupAdminNewMailing() {
  const { close } = usePopupContext()
  async function submitMailing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"subject" | "content">

    ClientAPI
      .query(postMailings({
        subject: elements.subject.value,
        content: elements.content.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }

  return (
    <PopupLayout title="Создать рассылку" width="80em">
      <form onSubmit={submitMailing}>
        <Input name="subject" placeholder="Тема на выбраном языке" />
        <div className="input">
          <textarea className="input__input" rows={15} name="content" placeholder="Контент на выбраном языке" />
        </div>
        <Button color="dark" type="submit">Создать</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminEditMailingsProps {
  mailing: MailingPreviewType
}

export function PopupAdminEditMailing(props: PopupAdminEditMailingsProps) {
  const { close } = usePopupContext()
  const { error, loading, payload } = useQuery(getMailing(props.mailing.id))
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>
  async function submitMailing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"subject" | "content">

    ClientAPI
      .query(postMailings({
        subject: elements.subject.value,
        content: elements.content.value
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  function sendMailing() {
    ClientAPI
      .query(postMailingSend(props.mailing.id))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Расослать рассылку" width="30em">
      <form onSubmit={submitMailing}>
        {/* <Input name="subject" placeholder="Тема на выбраном языке" defaultValue={payload.subject} key={payload.subject} />
        <div className="input">
          <textarea className="input__input" rows={15} name="content" placeholder="Контент на выбраном языке" defaultValue={payload.content} key={payload.content} />
        </div>
        <Button color="dark" type="submit">Сохранить</Button> */}
        <Button color="violet" onClick={sendMailing}>Разослать</Button>
      </form>
    </PopupLayout>
  )
}
