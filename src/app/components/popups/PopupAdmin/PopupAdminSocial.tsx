import { deletePagesLinksSocials, patchPagesLinksSocials, postPagesLinksSocials } from "api/actions/pages"
import ClientAPI from "api/client"
import { FormElements } from "interfaces/common"
import { PageLinkSocialType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { FormEvent } from "react"
import { FileToURLDataBase64 } from "utils/common"

import Button from "../../common/Button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"


export function PopupAdminNewSocial() {
  const { close } = useModal()
  async function submitSocial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"url" | "icon">

    const iconFile = elements.icon.files?.[0]
    if (!iconFile) return

    ClientAPI
      .query(postPagesLinksSocials({
        url: elements.url.value,
        icon: await FileToURLDataBase64(iconFile)
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Добавить ссылку">
      <form onSubmit={submitSocial}>
        <Input name="url" placeholder="Внешняя ссылка" />
        <Input name="icon" type="file" />
        <Button color="dark" type="submit">Добавить</Button>
      </form>
    </PopupLayout>
  )
}


interface PopupAdminEditSocialProps {
  img: PageLinkSocialType
}

export function PopupAdminEditSocial(props: PopupAdminEditSocialProps) {
  const { close } = useModal()
  function deleteSocial() {
    ClientAPI
      .query(deletePagesLinksSocials(props.img.id))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  async function submitSocial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"url" | "icon">

    const iconFile = elements.icon.files?.[0]
    if (!iconFile) return

    ClientAPI
      .query(patchPagesLinksSocials(props.img.id, {
        url: elements.url.value,
        icon: await FileToURLDataBase64(iconFile)
      }))
      .then(({ error }) => {
        if (error) return
        close()
        window.location.reload()
      })
  }
  return (
    <PopupLayout title="Редактироть ссылку">
      <form onSubmit={submitSocial}>
        <Input name="url" placeholder="Внешняя ссылка" defaultValue={props.img.url} key={props.img.url} />
        <Input name="icon" type="file" />
        <Button color="dark" type="submit">Сохранить</Button>
        <Button color="violet" onClick={deleteSocial}>Удалить</Button>
      </form>
    </PopupLayout>
  )
}
