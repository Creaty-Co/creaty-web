import { getFormsApplicationsXLSX, patchForm, putFormsApplicationsXLSX } from "api/actions/form"
import ClientAPI from "api/client"
import { APIOuterLink } from "api/helpers"
import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"
import { FormElements } from "interfaces/common"
import { FormFieldType, FormType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { FormEvent } from "react"
import { useSelector } from "react-redux"
import { FileToURLDataBase64 } from "utils/common"


const formTypes = ["name", "email", "telegram", "facebook", "whats_app", "viber", "about"]

function AdminFormsView() {
  const ll = useLocalization(ll => ll.other)
  const forms = useSelector(state => state.forms)
  const formsKeys = Object.keys(forms) as FormType["type"][]
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<FormFieldType["type"] | "id" | "description" | "post_send">
    const fieldInputs = [...elements].filter(element => ((element instanceof HTMLInputElement) || (element instanceof HTMLTextAreaElement)) && formTypes.includes(element.name)) as (HTMLInputElement | HTMLTextAreaElement)[]
    const fields = fieldInputs.map(input => ({ type: input.name as FormFieldType["type"], placeholder: input.value }))

    ClientAPI
      .query(patchForm(+elements.id.value, {
        description: elements.description.value,
        post_send: elements.post_send.value,
        fields
      }))
      .then(({ error }) => {
        if (error) return
        window.location.reload()
      })
  }
  async function submitXLSX(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"xlsx">
    const xlsx = elements.xlsx.files?.[0]

    if (!xlsx) return

    ClientAPI
      .query(putFormsApplicationsXLSX(await FileToURLDataBase64(xlsx)))
      .then(({ error }) => {
        if (error) return
        window.location.reload()
      })
  }
  return (
    <>
      <form className="admin-view" onSubmit={submitXLSX}>
        <h2 className="admin-view__title">Заявки</h2>
        <Input type="file" name="xlsx" />
        <Button color="dark">Загрузить</Button>
        <div className="button button--violet">
          <APIOuterLink className="button__text" action={getFormsApplicationsXLSX}>Скачать</APIOuterLink>
        </div>
      </form>
      {formsKeys.map(key => (
        <div className="admin-view" key={key}>
          <h2 className="admin-view__title">Форма: {ll.forms[forms[key]?.type || ""]?.title || "unknown"}</h2>
          <br />
          <br />
          <form className="admin-view__entires admin-view__entires--grid" onSubmit={submit}>
            <h3>Данные</h3>
            <br />
            <div className="admin-view__entires admin-view__entires--grid">
              <div className="input">
                <textarea className="input__input" name="description" placeholder="Описание" rows={4} defaultValue={forms[key]?.description || ""} key={forms[key]?.description || ""} />
              </div>
              <div className="input">
                <textarea className="input__input" name="post_send" placeholder="После отправки" rows={4} defaultValue={forms[key]?.post_send || ""} key={forms[key]?.post_send || ""} />
              </div>
            </div>
            <br />
            <br />
            <br />
            <h3>Поля</h3>
            <br />
            <div className="admin-view__entires admin-view__entires--grid">
              <i>Оставьте поле пустым чтобы удалить</i>
              <br />
              <br />
              <br />
              {formTypes.map(type => (
                <label key={type}>
                  <b>{type}</b>
                  <br />
                  {type === "about" && (
                    <div className="input">
                      <textarea className="input__input" name={type} cols={3} placeholder="Введите placeholder" defaultValue={forms[key]?.fields.find(field => field.type === type)?.placeholder || ""} key={forms[key]?.fields.find(field => field.type === type)?.placeholder || ""} />
                    </div>
                  )}
                  {type !== "about" && (
                    <Input name={type} placeholder="Введите placeholder" defaultValue={forms[key]?.fields.find(field => field.type === type)?.placeholder || ""} key={forms[key]?.fields.find(field => field.type === type)?.placeholder || ""} />
                  )}
                  <br />
                  <br />
                </label>
              ))}
            </div>
            <input type="hidden" name="id" value={forms[key]?.id} />
            <br />
            <br />
            <br />
            <Button color="dark" type="submit">Сохранить</Button>
          </form>
        </div>
      ))}
    </>
  )
}


export default AdminFormsView
