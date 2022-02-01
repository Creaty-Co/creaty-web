import "./Input.scss"

import Icon from "app/components/common/Icon/Icon"
import { ChangeEvent, DetailedHTMLProps, Dispatch, InputHTMLAttributes, useState } from "react"
import { classWithModifiers } from "utils/common"

import DropDown from "../DropDown/DropDown"


interface InputMaskType {
  title: string
  mask: string
}

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  masks?: InputMaskType[]
  onChange?: (event: ChangeEvent<HTMLInputElement>, mask?: InputMaskType) => void
}

function Input(props: InputProps) {
  const [currentMask, setCurrentMask] = useState(props.masks?.[0])
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event, currentMask)
  }
  return (
    <label className="input">
      <input className="input__input" {...{ ...props, masks: undefined }} placeholder={props.placeholder + ((props.required && !props.masks?.length) ? "*" : "")} onChange={onChange} />
      {props.masks && (
        <InputMasks masks={props.masks} onChange={setCurrentMask} />
      )}
    </label>
  )
}


interface InputMasksProps {
  masks: InputMaskType[]
  onChange: Dispatch<InputMaskType>
}

function InputMasks(props: InputMasksProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentMask, setCurrentMask] = useState<InputMaskType>(props.masks[0])
  function onChange(index: number) {
    const mask = props.masks[index]

    setCurrentMask(mask)
    props.onChange(mask)
  }
  return (
    <div className="input-masks">
      <button className="input-masks__current" type="button" onClick={() => setIsExpanded(!isExpanded)}>
        {currentMask.title}
        <Icon className={classWithModifiers("input-masks__icon", isExpanded && "up")} name="chevron" />
      </button>
      <div className="input-masks__list">
        <DropDown<number> expanded={isExpanded} onChange={onChange}>
          {props.masks.map((mask, index) => (
            <option value={index} key={index}>{mask.title}</option>
          ))}
        </DropDown>
      </div>
    </div >
  )
}


export default Input
