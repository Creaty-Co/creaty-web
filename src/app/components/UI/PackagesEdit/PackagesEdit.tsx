import "./PackagesEdit.scss"

import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"
import { MentorPackageType } from "interfaces/types"
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react"

interface PackagesEditProps {
  defaultValues?: MentorPackageType[]
  onChange: Dispatch<MentorPackageType[]>
}

function PackagesEdit(props: PackagesEditProps) {
  const uniqueID = useRef(Math.max(...props.defaultValues?.map(pack => pack.id) || [0]))
  const [packages, setPackages] = useState<MentorPackageType[]>(props.defaultValues || [])
  function editPack(pack: MentorPackageType) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      packages[packages.indexOf(pack)][target.name as Exclude<keyof MentorPackageType, "id">] = +target.value
      setPackages([...packages])
    }
  }
  function addPack() {
    console.log(uniqueID)
    uniqueID.current += 1
    setPackages([...packages, { id: uniqueID.current, discount: 0, lessons_count: 0 }])
  }
  function removePack(pack: MentorPackageType) {
    setPackages([...packages.filter(packg => packg !== pack)])
  }
  useEffect(() => props.onChange?.(packages), [packages])
  return (
    <div className="packages-edit">
      {packages.map((pack, index) => (
        <PackagesEditPack {...pack} index={index} onChange={editPack(pack)} onRemove={() => removePack(pack)} key={pack.id} />
      ))}
      <Button color="dark" onClick={addPack}>Добавить пакет</Button>
    </div>
  )
}


interface PackagesEditPackProps extends MentorPackageType {
  index: number

  onRemove?(): void
  onChange?(event: ChangeEvent<HTMLInputElement>): void
}

function PackagesEditPack(props: PackagesEditPackProps) {
  return (
    <div className="packages-edit__pack">
      <div className="packages-edit__header">
        <div className="packages-edit__title">Пакет номер {props.index + 1}</div>
        <Button color="violet" onClick={props.onRemove}>Удалить</Button>
      </div>
      <label className="packages-edit__label">
        <span>Кол-во</span>
        <Input onChange={props.onChange} placeholder="Введите кол-во" name="lessons_count" defaultValue={props.lessons_count} />
      </label>
      <label className="packages-edit__label">
        <span>Скидку</span>
        <Input onChange={props.onChange} placeholder="Введите скидку" name="discount" defaultValue={props.discount} />
      </label>
    </div>
  )
}

export default PackagesEdit