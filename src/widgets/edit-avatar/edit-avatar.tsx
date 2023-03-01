import "./edit-avatar.scss"

import { Icon } from "@shared"
import { ChangeEvent, useState } from "react"
import { classWithModifiers } from "utils/common"

interface EditAvatarProps {
  name?: string
  image: string
  onChange?(file: File): void | Promise<unknown>
  required?: boolean
}

function EditAvatar(props: EditAvatarProps) {
  const [image, setImage] = useState(props.image)
  const [pending, setPending] = useState(false)
  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    // checks
    const files = target.files
    if (files === null) return
    const file = files[0] as File | undefined
    if (file == null) return
    // awaits
    if (props.onChange) {
      setPending(true)
      await props.onChange?.(file)
      setPending(false)
    }
    // updates
    setImage(URL.createObjectURL(file))
  }
  return (
    <div className={classWithModifiers("edit-avatar", pending && "pending")}>
      <img src={image} alt="avatar" className="edit-avatar__image" />
      <label className="edit-avatar__cover">
        <Icon className="edit-avatar__icon" name="touch" />
        <input name={props.name} required={props.required} className="edit-avatar__input" type="file" accept="image/*" onChange={onChange} aria-hidden={false} />
      </label>
    </div>
  )
}

export default EditAvatar
