import { patchForm, postFormsApplicationsXLSX, putFormsApplicationsXLSX } from "api/actions/form"
import ClientAPI from "api/client"
import { APIDynamicOuterLink } from "api/helpers"
import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { FormElements } from "interfaces/common"
import { FormFieldType, FormType } from "interfaces/types"
import _ from "lodash"
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
    <AdminViewLayout>
      <form onSubmit={submitXLSX}>
        <AdminGroupLayout title="Заявки">
          <APIDynamicOuterLink action={postFormsApplicationsXLSX} className="button button--dark">
            <div className="button__text">Скачать</div>
          </APIDynamicOuterLink>
        </AdminGroupLayout>
      </form>
      {formsKeys.map(key => (
        <form className="admin-view__entires admin-view__entires--grid" onSubmit={submit} key={key}>
          <AdminGroupLayout title={`Форма: ${ll.forms[forms[key]?.type || ""]?.title || "unknown"}`}>
            <h1>Данные</h1>
            <div className="admin-view__entires admin-view__entires--grid">
              <h3>Описание {"->"}</h3>
              <br />
              <div className="input">
                <textarea className="input__input" name="description" placeholder="Описание" rows={4} defaultValue={forms[key]?.description || ""} key={forms[key]?.description || ""} />
              </div>
              <br />
              <h3>Сообщение после отправки {"->"}</h3>
              <br />
              <div className="input">
                <textarea className="input__input" name="post_send" placeholder="После отправки" rows={4} defaultValue={forms[key]?.post_send || ""} key={forms[key]?.post_send || ""} />
              </div>
            </div>
            <h1>Поля</h1>
            <div className="admin-view__entires admin-view__entires--grid">
              <i>Оставьте поле пустым чтобы удалить</i>
              <br />
              <br />
              <br />
              {formTypes.map(type => (
                <label key={type}>
                  <h3>{_.capitalize(type)} {"->"}</h3>
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
            <div><Button color="dark" type="submit">Сохранить</Button></div>
          </AdminGroupLayout>
        </form>
      ))}
    </AdminViewLayout>
  )
}


export default AdminFormsView
