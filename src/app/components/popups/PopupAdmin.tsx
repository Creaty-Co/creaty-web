import ClientAPI from "api/client"
import { FormElements } from "interfaces/common"
import { usePopupContext } from "modules/popup/hook"
import { FormEvent } from "react"

import Button from "../common/Button/Button"
import Input from "../UI/Input/Input"
import PopupLayout from "./PopupLayout"

export function PopupAdminNewTopic() {
  const { close } = usePopupContext()
  function submitAddNewTopic(event: FormEvent<HTMLFormElement>) {
    const target = event.currentTarget
    const elements = target.elements as FormElements<"title_ru" | "title_en" | "shortcut">

    // ClientAPI
    // .query()
    // .then(({error}) => {
    //   if (error) return
    //   close()
    // })
  }
  return (
    <PopupLayout title="Добавить новую категорию">
      <form onSubmit={submitAddNewTopic}>
        <Input name="title_ru" placeholder="Название на русском" />
        <Input name="title_en" placeholder="Название на английском" />
        <Input name="shortcut" placeholder="Ярлык" />
        <Button color="dark">Добавить</Button>
      </form>
    </PopupLayout>
  )
}
