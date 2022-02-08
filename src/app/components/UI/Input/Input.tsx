import "./Input.scss"

import Icon from "app/components/common/Icon/Icon"
import useClickAway from "hooks/useClickAway"
import { ChangeEvent, DetailedHTMLProps, Dispatch, InputHTMLAttributes, useRef, useState } from "react"
import { classWithModifiers } from "utils/common"

import DropDown from "../DropDown/DropDown"



export interface InputStrainType<V> {
  title: string
  value: V
}

interface InputProps<V> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  strains?: InputStrainType<V>[]
  onChange?: (event: ChangeEvent<HTMLInputElement>, strain?: InputStrainType<V>) => void
}

function Input<V>(props: InputProps<V>) {
  const [currentStrain, setCurrentStrain] = useState(props.strains?.[0])
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event, currentStrain)
  }
  return (
    <label className="input">
      <input className="input__input" {...{ ...props, strains: undefined }} placeholder={props.placeholder + ((props.required && !props.strains?.length) ? "*" : "")} onChange={onChange} />
      {props.strains && (
        <InputStrains strains={props.strains} onChange={setCurrentStrain} />
      )}
    </label>
  )
}


interface InputMasksProps<V> {
  strains: InputStrainType<V>[]
  onChange: Dispatch<InputStrainType<V>>
}

function InputStrains<V>(props: InputMasksProps<V>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStrain, setCurrentStrain] = useState(props.strains[0])
  function onChange(index: number) {
    const strain = props.strains[index]

    setCurrentStrain(strain)
    props.onChange(strain)
  }
  useClickAway(parentRef, () => setIsExpanded(false))
  return (
    <div className="input-masks" ref={parentRef}>
      <button className="input-masks__current" type="button" onClick={() => setIsExpanded(!isExpanded)} >
        {currentStrain.title}
        <Icon className={classWithModifiers("input-masks__icon", isExpanded && "up")} name="chevron" />
      </button>
      <div className="input-masks__list">
        <DropDown<number> expanded={isExpanded} onChange={onChange}>
          {props.strains.map((mask, index) => (
            <option value={index} key={index}>{mask.title}</option>
          ))}
        </DropDown>
      </div>
    </div>
  )
}


export default Input
