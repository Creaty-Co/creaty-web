import { deletePagesLinksSocials, patchPagesLinksSocials, postPagesLinksSocials } from "api/actions/pages"
import Form, { FormState } from "app/components/UI/Form/Form"
import { PageLinkSocialType } from "interfaces/types"
import { useModal } from "modules/modal/hook"
import { useState } from "react"
import { useClient } from "react-fetching-library"
import { toast } from "react-toastify"

import Button from "../../../../shared/ui/button/Button"
import Input from "../../UI/Input/Input"
import PopupLayout from "../PopupLayout"

enum FormInputs {
  url = "url",
  icon = "icon"
}
interface FormValues {
  url: string
  icon?: string
}

export function PopupAdminNewSocial() {
  const { close } = useModal()
  const client = useClient()
  const [pending, setPending] = useState(false)
  async function onSubmit(state: FormState<FormInputs, FormValues>) {
    const { url, icon } = state.values
    if (icon == null) {
      return toast.error("Вы не выбрали иконку")
    }

    setPending(true)
    const { error } = await client.query(postPagesLinksSocials({ url, icon }))
    setPending(false)
    if (error) return

    close()
  }
  return (
    <PopupLayout title="Добавить ссылку">
      <Form onSubmit={onSubmit}>
        <Input name={FormInputs.url} placeholder="Внешняя ссылка" />
        <Input name={FormInputs.icon} type="file" />
        <Button color="dark" type="submit" pending={pending}>Добавить</Button>
      </Form>
    </PopupLayout>
  )
}


interface PopupAdminEditSocialProps {
  img: PageLinkSocialType
}

export function PopupAdminEditSocial(props: PopupAdminEditSocialProps) {
  const { close } = useModal()
  const client = useClient()
  const [pending, setPending] = useState(false)
  async function deleteSocial() {
    const { error } = await client.query(deletePagesLinksSocials(props.img.id))
    if (error) return

    close()
  }
  async function onSubmit(state: FormState<FormInputs, FormValues>) {
    setPending(true)
    const { error } = await client.query(patchPagesLinksSocials(props.img.id, state.values))
    setPending(false)
    if (error) return

    close()
  }
  return (
    <PopupLayout title="Редактировать ссылку">
      <Form onSubmit={onSubmit}>
        <Input name={FormInputs.url} placeholder="Внешняя ссылка" defaultValue={props.img.url} key={props.img.url} />
        <Input name={FormInputs.icon} type="file" />
        <Button color="dark" type="submit" pending={pending}>Сохранить</Button>
        <Button color="violet" onClick={deleteSocial}>Удалить</Button>
      </Form>
    </PopupLayout>
  )
}
