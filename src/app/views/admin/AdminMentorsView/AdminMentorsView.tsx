import "react-toastify/dist/ReactToastify.css"

import { getAdminMentors } from "api/actions/admin"
import { patchMentorsId } from "api/actions/mentors"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import Input from "app/components/UI/Input/Input"
import { MentorPatchType } from "interfaces/types"
import { Popup } from "modules/popup/controller"
import { Children, cloneElement, DetailedHTMLProps, FocusEvent, HTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactElement, useRef, useState } from "react"
import { useQuery } from "react-fetching-library"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { AdminCountriesSelect } from "../helpers"


function AdminMentorsView() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const { payload } = useQuery(getAdminMentors(page, pageSize))
  if (!payload) return null
  return (
    <div className="admin-view">
      <ButtonLink color="dark" to="/admin/new-mentor">Добавить ментора</ButtonLink>
      <table className="admin-view__table">
        <thead>
          <tr>
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
            <th>Город на русском</th>
            <th>Город на английском</th>
          </tr>
        </thead>
        <tbody>
          {payload.results.map(mentor => (
            <tr key={mentor.id}>
              <td>{mentor.id}</td>
              <td>
                <section>
                  <div>
                    <img src={mentor.avatar} />
                    <Link className="ghost" to={"/user/" + mentor.id} />
                  </div>
                  <PartialEditMentorInput id={mentor.id} name="avatar" defaultValue={mentor.avatar} />
                </section>
              </td>
              <td><PartialEditMentorInput id={mentor.id} name="first_name" defaultValue={mentor.first_name} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="last_name" defaultValue={mentor.last_name} /></td>
              <td>
                <PartialEditMentorInput id={mentor.id} name="country" defaultValue={mentor.country.id}>
                  <AdminCountriesSelect defaultValue={mentor.country.id} />
                </PartialEditMentorInput>
              </td>
              <td><PartialEditMentorInput id={mentor.id} name="profession" defaultValue={mentor.profession} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="company" defaultValue={mentor.company} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="price" defaultValue={mentor.price} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="price_currency" defaultValue={mentor.price_currency} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="trial_meeting" defaultChecked={!!mentor.info.trial_meeting} type="checkbox" /></td>
              <td><PartialEditMentorInput id={mentor.id} name="city_ru" defaultValue={mentor.info.city_ru} /></td>
              <td><PartialEditMentorInput id={mentor.id} name="city_en" defaultValue={mentor.info.city_en} /></td>
              <td><Button color="dark" onClick={() => Popup}>Ред. перс. страницу</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button color="dark" onClick={() => setPage(page - 1)}>Сюда</Button>
      <Button color="dark" onClick={() => setPage(page + 1)}>Туда</Button>
    </div>
  )
}


interface PartialEditMentorInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id"> {
  id: number
  name: Exclude<keyof MentorPatchType, "info"> | Exclude<keyof MentorPatchType["info"], "languages">
  defaultValue?: string | number

  children?: ReactElement<HTMLAttributes<HTMLElement>>
}

function PartialEditMentorInput(props: PartialEditMentorInputProps) {
  const prevValueRef = useRef<string | number | boolean | null | undefined>(props.defaultValue || props.defaultChecked)
  const infoFields = [
    "trial_meeting",
    "resume",
    "what_help",
    "experience",
    "portfolio",
    "city_ru",
    "city_en"
  ]
  function onBlur(event: FocusEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const targetValue = props.defaultChecked !== undefined ? (+target.checked || null) : (target.valueAsNumber || target.value)

    if (prevValueRef.current === targetValue) return

    ClientAPI
      .query(patchMentorsId(+props.id,
        infoFields.includes(props.name)
          ? { info: { [props.name]: targetValue } }
          : { [props.name]: targetValue }
      ))
      .then(({ error }) => {
        if (error) return

        if (props.defaultChecked !== undefined) {
          toast.info(`ALTER \`${props.name}\` IN ${props.id} VALUE ${!!prevValueRef.current} => ${!!targetValue}`)
        } else {
          toast.info(`ALTER \`${props.name}\` IN ${props.id} VALUE ${prevValueRef.current} => ${targetValue}`)
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

  return (
    <Input {...props} id={undefined} name={undefined} onBlur={onBlur} onKeyDown={onKeyDown} />
  )
}

export default AdminMentorsView
