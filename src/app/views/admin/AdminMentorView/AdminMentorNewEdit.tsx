import { patchMentorsId, postMentors } from "api/actions/mentors"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import { PopupAdminNewTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import { PopupAdminNewTopic } from "app/components/popups/PopupAdmin/PopupAdminTopic"
import CheckTree from "app/components/UI/CheckTree/CheckTree"
import Input from "app/components/UI/Input/Input"
import PackagesEdit from "app/components/UI/PackagesEdit/PackagesEdit"
import { MentorDetailedType, MentorPackageType } from "interfaces/types"
import { Popup } from "modules/popup/controller"
import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { FileToURLDataBase64, getCheckedValues, toBase64 } from "utils/common"

import countries from "../countries.json"
import { AdminCountriesSelect, AdminLangsCheckboxes } from "../helpers"
import langs from "../langs.json"


interface AdminNewMentorViewProps {
  new: true
  id?: undefined
  data?: undefined
}

interface AdminEditMentorViewProps {
  new?: false
  id: number
  data: MentorDetailedType
}

function AdminMentorNewEdit(props: AdminNewMentorViewProps | AdminEditMentorViewProps) {
  const navigate = useNavigate()
  const topics = useSelector(state => state.topics)
  const [packages, setPackages] = useState<Omit<MentorPackageType, "id">[]>(props.data?.packages || [])
  async function submitCreateMentor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    interface FormElements extends HTMLFormControlsCollection {
      // ---------- INFO --------------------------
      tag_set: RadioNodeList & HTMLInputElement[]
      languages: RadioNodeList & HTMLInputElement[]

      city_ru: HTMLInputElement
      city_en: HTMLInputElement

      portfolio: HTMLInputElement
      experience: HTMLInputElement
      what_help: HTMLInputElement
      resume: HTMLInputElement

      trial_meeting: HTMLInputElement
      // ----------------------------
      avatar: HTMLInputElement
      company: HTMLInputElement
      profession: HTMLInputElement
      first_name: HTMLInputElement
      last_name: HTMLInputElement
      price: HTMLInputElement
      price_currency: HTMLInputElement
      country: HTMLInputElement
    }

    const target = event.currentTarget
    const elements = target.elements as FormElements
    const APIPayload = {
      info: {
        trial_meeting: +elements.trial_meeting.checked || null,
        resume: elements.resume.value,
        what_help: elements.what_help.value,
        experience: elements.experience.value,
        portfolio: elements.portfolio.value,
        languages: getCheckedValues(elements.languages).map(Number),
        city_ru: elements.city_ru.value,
        city_en: elements.city_en.value
      },
      packages,
      tag_set: getCheckedValues(elements.tag_set).map(Number),
      // -------------------------------------------
      avatar: elements.avatar.files?.[0] ? await FileToURLDataBase64(elements.avatar.files[0]) : (props.data?.avatar || ""),
      company: elements.company.value,
      profession: elements.profession.value,
      first_name: elements.first_name.value,
      last_name: elements.last_name.value,
      price: elements.price.value,
      price_currency: elements.price_currency.value,
      country: +elements.country.value,
    }
    const APIAction = props.new ? postMentors(APIPayload) : patchMentorsId(props.id, APIPayload)

    ClientAPI
      .query(APIAction)
      .then(({ error, payload }) => {
        if (error || !payload) return
        navigate("/user/" + payload.id)
      })
  }

  if (topics.tags.length === 0) return null
  return (
    <form className="admin-view" onSubmit={submitCreateMentor}>
      <div className="admin-view__entries admin-view__entries--grid">

        <Input name="first_name" placeholder="Имя" defaultValue={props.data?.first_name} />
        <Input name="last_name" placeholder="Фамилия" defaultValue={props.data?.last_name} />

        <Input name="profession" placeholder="profession" defaultValue={props.data?.profession} />
        <Input name="company" placeholder="Компания" defaultValue={props.data?.company} />

        <Input name="price" placeholder="price" defaultValue={props.data?.price} />
        <select name="price_currency" defaultValue={props.data?.price_currency}>
          <option value="RUB">Рубль</option>
          <option value="USD">Доллар</option>
        </select>

        Тэги
        {/* {topics.tags.map(tag => (
          <label key={tag.id}>
            {tag.title}
            <input name="tag_set" type="checkbox" defaultChecked={!!(props.data?.tags.find(tagg => tagg.id === tag.id))} value={tag.id} />
          </label>
        ))} */}
        <CheckTree name="tag_set" defaultChecks={props.data?.tags.map(tag => tag.id)}>
          <Button iconLeft={<Icon name="touch" />} color="white" onClick={() => Popup.open(PopupAdminNewTopic)}>Добавить категорию</Button>
          {topics.list.map(topic => (
            <option title={topic.title} key={topic.id}>
              <Button iconLeft={<Icon name="touch" />} color="white" onClick={() => Popup.open(PopupAdminNewTag, { topicId: topic.id })}>Добавить тэг</Button>
              {topic.tags.map(tag => (
                <option title={tag.title} value={tag.id} key={tag.id} />
              ))}
            </option>
          ))}
        </CheckTree>
        Страна
        <AdminCountriesSelect defaultValue={props.data?.country.id} />
        <Input name="city_ru" placeholder="Город на русском" defaultValue={props.data?.info.city_ru} />
        <Input name="city_en" placeholder="Город на английском" defaultValue={props.data?.info.city_en} />
        Языки
        <AdminLangsCheckboxes defaultChecked={props.data?.info.languages.map(lang => lang.id)} />

        Аватарка
        <img src={props.data?.avatar} width="20%" />
        <Input type="file" name="avatar" />

        <div className="input">
          <textarea name="portfolio" placeholder="Портфолио" className="input__input" defaultValue={props.data?.info.portfolio} />
        </div>
        <div className="input">
          <textarea name="experience" placeholder="Опыт" className="input__input" defaultValue={props.data?.info.experience} />
        </div>
        <div className="input">
          <textarea name="what_help" placeholder="С чем помогу" className="input__input" defaultValue={props.data?.info.what_help} />
        </div>
        <div className="input">
          <textarea name="resume" placeholder="Резюме" className="input__input" defaultValue={props.data?.info.resume} />
        </div>

        <PackagesEdit defaultValues={props.data?.packages} onChange={setPackages} />

        <label>
          15 минут бесплатной встречи
          <Input name="trial_meeting" type="checkbox" defaultChecked={!!props.data?.info.trial_meeting} />
        </label>
      </div>
      <br />
      <br />
      <Button color="violet" type="submit">Сделать</Button>
    </form>
  )
}


export default AdminMentorNewEdit
