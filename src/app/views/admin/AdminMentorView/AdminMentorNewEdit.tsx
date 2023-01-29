import { patchMentorsId, postMentors } from "api/actions/mentors"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import Icon from "app/components/common/Icon/Icon"
import { PopupAdminNewTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import { PopupAdminNewTopic } from "app/components/popups/PopupAdmin/PopupAdminTopic"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import CheckTree from "app/components/UI/CheckTree/CheckTree"
import EditAvatar from "app/components/UI/EditAvatar/EditAvatar"
import Form, { FormState } from "app/components/UI/Form/Form"
import Input from "app/components/UI/Input/Input"
import PackagesEdit from "app/components/UI/PackagesEdit/PackagesEdit"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { MentorDetailedType, MentorPatchType } from "interfaces/types"
import _ from "lodash"
import { Modal } from "modules/modal/controller"
import { useState } from "react"
import { DefaultRootState, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { AdminCountriesSelect, AdminLangsCheckboxes } from "../helpers"

enum FormInputs {
  // ---------- INFO --------------------------
  languages = "languages",

  city = "city",

  experience = "experience",
  whatHelp = "what_help",
  resume = "resume",

  trialMeeting = "trial_meeting",
  // ----------------------------
  avatar = "avatar",
  company = "company",
  profession = "profession",
  firstName = "first_name",
  lastName = "last_name",
  price = "price",
  country = "country",
  tags = "tag_set"
}

type FormValues = Omit<MentorPatchType, "info" | "packages"> & MentorPatchType["info"]

const formInfoKeys = ["languages", "experience", "resume", "trial_meeting", "what_help", "city"] as const

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
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  const [packages, setPackages] = useState<MentorPatchType["packages"]>(props.data?.packages || [])

  async function submitCreateMentor(state: FormState<FormInputs, FormValues>) {
    const APIPayload: MentorPatchType = {
      info: {
        ..._.pick(state.values, formInfoKeys) as MentorPatchType["info"],
        trial_meeting: state.values.trial_meeting ? 15 : null
      },
      packages,
      ..._.omit(state.values, ...formInfoKeys)
    }
    
    /* type assertion fall bug! */
    if (!Array.isArray(APIPayload.info.languages)) APIPayload.info.languages = [APIPayload.info.languages]
    if (!Array.isArray(APIPayload.tag_set)) APIPayload.tag_set = [APIPayload.tag_set]

    const APIAction = props.new ? postMentors(APIPayload) : patchMentorsId(props.id, APIPayload)
    setPending(true)
    const { error, payload } = await ClientAPI.query(APIAction)
    setPending(false)
    if (error || !payload) return

    navigate("/user/" + payload.id)
  }

  return (
    <Form onSubmit={submitCreateMentor}>
      <AdminViewLayout>

        {/* General */}
        <AdminGroupLayout title="Общая информация">
          <Input name={FormInputs.firstName} placeholder="Имя" defaultValue={props.data?.first_name} required />
          <Input name={FormInputs.lastName} placeholder="Фамилия" defaultValue={props.data?.last_name} required />

          <Input name={FormInputs.profession} placeholder="Профессия" defaultValue={props.data?.profession} required />
          <Input name={FormInputs.company} placeholder="Компания" defaultValue={props.data?.company} required />
        </AdminGroupLayout>

        {/* Price */}
        <AdminGroupLayout title="Оплата">
          <Input required
            name={FormInputs.price} 
            type="number" 
            placeholder="Оплата за час" 
            defaultValue={props.data?.price}  
            masks={[{ title: "Доллар", value: "USD" }]}
            masksName="USD" />
        </AdminGroupLayout>

        {/* Tags */}
        <AdminGroupLayout title="Тэги">
          <CheckTree name={FormInputs.tags} defaultChecks={props.data?.tags.map(tag => tag.id) || [2, 3]}>
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

        {/* Location */}
        <AdminGroupLayout title="Местоположение">
          <div>
            <h4 className="heading">Страна</h4>
            <AdminCountriesSelect name={FormInputs.country} defaultValue={props.data?.country.id} />
          </div>
          <Input name={FormInputs.city} placeholder="Город" defaultValue={props.data?.info.city} required />
        </AdminGroupLayout>

        {/* Languages */}
        <AdminGroupLayout title="Языки">
          <AdminLangsCheckboxes name={FormInputs.languages} defaultChecked={props.data?.info.languages.map(lang => lang.id) || [9, 4]} />
        </AdminGroupLayout>

        {/* Avatar */}
        <AdminGroupLayout title="Аватарка">
          <EditAvatar image={props.data?.avatar || ""} name={FormInputs.avatar} />
        </AdminGroupLayout>

        {/* About */}
        <AdminGroupLayout title="Наполнение профиля">

          <div className="input">
            <textarea
              name={FormInputs.experience} 
              placeholder="Опыт" 
              className="input__input" 
              defaultValue={props.data?.info.experience}
              required
            />
          </div>

          <div className="input">
            <textarea name={FormInputs.whatHelp} placeholder="С чем помогу" className="input__input" defaultValue={props.data?.info.what_help} required />
          </div>
          <div className="input">
            <textarea name={FormInputs.resume} placeholder="Резюме" className="input__input" defaultValue={props.data?.info.resume} required />
          </div>
        </AdminGroupLayout>
        <AdminGroupLayout title="Пакеты">
          <PackagesEdit defaultValues={props.data?.packages} onChange={setPackages} />
        </AdminGroupLayout>
        <AdminGroupLayout title="Доп. Настройки">
          <Checkbox name={FormInputs.trialMeeting} defaultChecked={!!props.data?.info.trial_meeting}>15 минут бесплатной встречи</Checkbox>
        </AdminGroupLayout>
        <Button size="big" color="violet" type="submit" pending={pending}>{props.new ? "Добавить ментора" : "Сохранить изменения"}</Button>
      </AdminViewLayout>
    </Form>
  )
}


export default AdminMentorNewEdit
