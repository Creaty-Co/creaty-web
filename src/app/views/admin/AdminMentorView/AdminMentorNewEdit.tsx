import { patchMentorsId, postMentors } from "api/actions/mentors"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import { PopupAdminNewTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import { PopupAdminNewTopic } from "app/components/popups/PopupAdmin/PopupAdminTopic"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import CheckTree from "app/components/UI/CheckTree/CheckTree"
import EditAvatar from "app/components/UI/EditAvatar/EditAvatar"
import Input from "app/components/UI/Input/Input"
import PackagesEdit from "app/components/UI/PackagesEdit/PackagesEdit"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { MentorDetailedType, MentorPackageType } from "interfaces/types"
import { Modal } from "modules/modal/controller"
import { FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { FileToURLDataBase64, getCheckedValues } from "utils/common"

import { AdminCountriesSelect, AdminLangsCheckboxes } from "../helpers"


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
  const [pending, setPending] = useState(false)
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

    setPending(true)
    const { error, payload } = await ClientAPI.query(APIAction)
    setPending(false)
    if (error || !payload) return

    navigate("/user/" + payload.id)
  }
  return (
    <form onSubmit={submitCreateMentor}>
      <AdminViewLayout>
        <AdminGroupLayout title="Общая информация">
          <Input name="first_name" placeholder="Имя" defaultValue={props.data?.first_name} required />
          <Input name="last_name" placeholder="Фамилия" defaultValue={props.data?.last_name} required />

          <Input name="profession" placeholder="Профессия" defaultValue={props.data?.profession} required />
          <Input name="company" placeholder="Компания" defaultValue={props.data?.company} required />
        </AdminGroupLayout>
        <AdminGroupLayout title="Оплата">
          <Input name="price" type="number" placeholder="Оплата за час" defaultValue={props.data?.price} required />
          <select name="price_currency" defaultValue={props.data?.price_currency} required>
            <option value="RUB">Рубль</option>
            <option value="USD">Доллар</option>
          </select>
        </AdminGroupLayout>
        <AdminGroupLayout title="Тэги">
          <CheckTree name="tag_set" defaultChecks={props.data?.tags.map(tag => tag.id) || [2, 3]}>
            <Button iconLeft={<Icon name="touch" />} color="white" onClick={() => Modal.open(PopupAdminNewTopic)}>Добавить категорию</Button>
            {topics.list.map(topic => (
              <option title={topic.title} key={topic.id}>
                <Button iconLeft={<Icon name="touch" />} color="white" onClick={() => Modal.open(PopupAdminNewTag, { topicId: topic.id })}>Добавить тэг</Button>
                {topic.tags.map(tag => (
                  <option title={tag.title} value={tag.id} key={tag.id} />
                ))}
              </option>
            ))}
          </CheckTree>
        </AdminGroupLayout>
        <AdminGroupLayout title="Местоположение">
          <div>
            <h4 className="heading">Страна</h4>
            <AdminCountriesSelect defaultValue={props.data?.country.id} />
          </div>
          <Input name="city_ru" placeholder="Город на русском" defaultValue={props.data?.info.city_ru} required />
          <Input name="city_en" placeholder="Город на английском" defaultValue={props.data?.info.city_en} required />
        </AdminGroupLayout>
        <AdminGroupLayout title="Языки">
          <AdminLangsCheckboxes defaultChecked={props.data?.info.languages.map(lang => lang.id) || [9, 4]} />
        </AdminGroupLayout>
        <AdminGroupLayout title="Аватарка">
          <EditAvatar image={props.data?.avatar || ""} name="avatar" />
        </AdminGroupLayout>
        <AdminGroupLayout title="Наполнение профиля">
          <div className="input">
            <textarea name="portfolio" placeholder="Портфолио" className="input__input" defaultValue={props.data?.info.portfolio} required />
          </div>
          <div className="input">
            <textarea name="experience" placeholder="Опыт" className="input__input" defaultValue={props.data?.info.experience} required />
          </div>
          <div className="input">
            <textarea name="what_help" placeholder="С чем помогу" className="input__input" defaultValue={props.data?.info.what_help} required />
          </div>
          <div className="input">
            <textarea name="resume" placeholder="Резюме" className="input__input" defaultValue={props.data?.info.resume} required />
          </div>
        </AdminGroupLayout>
        <AdminGroupLayout title="Пакеты">
          <PackagesEdit defaultValues={props.data?.packages} onChange={setPackages} />
        </AdminGroupLayout>
        <AdminGroupLayout title="Доп. Настройки">
          <Checkbox name="trial_meeting" defaultChecked={!!props.data?.info.trial_meeting}>15 минут бесплатной встречи</Checkbox>
        </AdminGroupLayout>
        <Button size="big" color="violet" type="submit" pending={pending}>{props.new ? "Добавить ментора" : "Сохранить изменения"}</Button>
      </AdminViewLayout>
    </form>
  )
}


export default AdminMentorNewEdit
