import "react-toastify/dist/ReactToastify.css"

import { getAdminMentors } from "api/actions/admin"
import { patchMentorsSlug } from "api/actions/mentors"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import { PopupAdminPersonalMentors } from "app/components/popups/PopupAdmin/PopupAdminPersonalPage"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import Input from "app/components/UI/Input/Input"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { MentorPatchType } from "interfaces/types"
import _ from "lodash"
import { Modal } from "modules/modal/controller"
import { Children, cloneElement, DetailedHTMLProps, FocusEvent, HTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactElement, useRef, useState } from "react"
import { useQuery } from "react-fetching-library"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { AdminCountriesSelect } from "../helpers"

const DEFAULT_PAGE_SIZE = 20

function AdminMentorsView() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const { payload, loading } = useQuery(getAdminMentors(page, pageSize))

  return (
    <AdminViewLayout maxWidth="75vw">
      <AdminGroupLayout title="Добавить Ментора">
        <ButtonLink color="dark" to="/admin/new-mentor">Добавить</ButtonLink>
      </AdminGroupLayout>
      <AdminGroupLayout title="Таблица Менторов">
        <div className="admin-view__container">
          <Input placeholder={`Кол-во менторов на страницу (обычно ${DEFAULT_PAGE_SIZE})`} onChange={event => setPageSize(Number(event.currentTarget.value) || DEFAULT_PAGE_SIZE)} />
          <br />
          <table className="admin-view__table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Аватар</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Страна</th>
                <th>Профессия</th>
                <th>Компания</th>
                <th>Оплата</th>
                <th>Валюта Оплаты</th>
                <th>Пробная встреча?</th>
                <th>Город</th>
              </tr>
            </thead>
            <tbody>
              {payload?.results.map(mentor => (
                <tr key={mentor.id}>
                  <td><Button color="dark" onClick={() => Modal.open(PopupAdminPersonalMentors, { mentor })}>Ред. перс. страницу</Button></td>
                  <td>{mentor.id}</td>
                  
                  <td>
                    <section>
                      <div>
                        <img src={mentor.avatar} />
                        <Link className="ghost" to={"/user/" + mentor.id} />
                      </div>
                      <PartialEditMentorInput slug={mentor.slug} name="avatar" defaultValue={mentor.avatar} />
                    </section>
                  </td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="first_name" defaultValue={mentor.first_name} /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="last_name" defaultValue={mentor.last_name} /></td>

                  <td>
                    <PartialEditMentorInput slug={mentor.slug} name="country" defaultValue={mentor.country.id}>
                      <AdminCountriesSelect defaultValue={mentor.country.id} />
                    </PartialEditMentorInput>
                  </td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="profession" defaultValue={mentor.profession} /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="company" defaultValue={mentor.company} /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="price" defaultValue={mentor.price} /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="price_currency" defaultValue={mentor.price_currency} /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="trial_meeting" defaultChecked={!!mentor.info.trial_meeting} type="checkbox" /></td>

                  <td><PartialEditMentorInput slug={mentor.slug} name="city" defaultValue={mentor.info.city} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {page > 1 && (
            <Button color="dark" onClick={() => setPage(page - 1)} pending={loading}>Назад</Button>
          )}
          .
          {(page * pageSize) < (payload?.count || 0) && (
            <Button color="dark" onClick={() => setPage(page + 1)} pending={loading}>Вперёд</Button>
          )}
        </div>
      </AdminGroupLayout>
    </AdminViewLayout>
  )
}


interface PartialEditMentorInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id"> {
  slug: string
  name: Exclude<keyof MentorPatchType, "info"> | Exclude<keyof MentorPatchType["info"], "languages">
  defaultValue?: string | number

  width?: string
  children?: ReactElement<HTMLAttributes<HTMLElement>>
}

function PartialEditMentorInput(props: PartialEditMentorInputProps) {
  const prevValueRef = useRef<string | number | boolean | null | undefined>(props.defaultValue || props.defaultChecked)
  const infoFields = [
    "trial_meeting",
    "resume",
    "what_help",
    "experience",
    "city"
  ]
  function onBlur(event: FocusEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const targetValue = props.defaultChecked !== undefined ? (+target.checked || null) : (target.valueAsNumber || target.value)

    if (targetValue?.toString().length === 0) return
    if (prevValueRef.current === targetValue) return

    ClientAPI
      .query(patchMentorsSlug(props.slug,
        infoFields.includes(props.name)
          ? { info: { [props.name]: targetValue } }
          : { [props.name]: targetValue }
      ))
      .then(({ error }) => {
        if (error) return

        if (props.defaultChecked !== undefined) {
          toast.info(`ALTER \`${props.name}\` IN ${props.slug} VALUE ${!!prevValueRef.current} => ${!!targetValue}`)
        } else {
          toast.info(`ALTER \`${props.name}\` IN ${props.slug} VALUE ${prevValueRef.current} => ${targetValue}`)
        }

        prevValueRef.current = targetValue
      })
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur()
    }
  }

  if (props.children) {
    return cloneElement(Children.only(props.children), { ...props.children.props, onBlur, onKeyDown })
  }

  if (props.type === "checkbox") {
    return (
      <Checkbox {..._.omit(props, "id", "name")} onChange={onBlur}>На 15 минут</Checkbox>
    )
  }

  return (
    <Input {..._.omit(props, "id", "name")} placeholder="Пусто" onBlur={onBlur} onKeyDown={onKeyDown} />
  )
}

export default AdminMentorsView