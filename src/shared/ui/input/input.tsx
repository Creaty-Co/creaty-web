import "./input.scss"

import Icon from "app/components/common/Icon/Icon"
import useClickAway from "hooks/useClickAway"
import _ from "lodash"
import { ChangeEvent, DetailedHTMLProps, Dispatch, InputHTMLAttributes, useRef, useState } from "react"
import { bem, classMerge, classWithModifiers } from "utils/common"

import DropDown from "../drop-down/drop-down"


export interface InputStrainType<V> {
  title: string
  value: V
}

const CN = "input"
const { getElement, getModifier } = bem(CN)

interface InputProps<V> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  masks?: InputStrainType<V>[]
  masksName?: string
  onMaskSelect?: Dispatch<InputStrainType<V>>
  onChange?: (event: ChangeEvent<HTMLInputElement>, strain?: InputStrainType<V>) => void
}

function Input<V>(props: InputProps<V>) {
  const [currentMask, setCurrentMask] = useState(props.masks?.[0])

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event, currentMask)
  }

  function onMaskSelect(mask: InputStrainType<V>) {
    props.onMaskSelect?.(mask)
    setCurrentMask(mask)
  }

  return (
    <label className={classMerge(CN, props.className)}>
      <input
        {..._.omit(props, "masks", "onMaskSelect", "masksName")}
        className={getElement("input")} 
        placeholder={props.placeholder + ((props.required && !props.masks?.length) ? "*" : "")}

        onChange={onChange}
      />

      {props.masks &&
        <InputMasks masks={props.masks} masksName={props.masksName} onSelect={onMaskSelect} />
      }
    </label>
  )
}

interface InputMasksProps<V> {
  masks: InputStrainType<V>[]
  masksName?: string
  onSelect: Dispatch<InputStrainType<V>>
}

function InputMasks<V>(props: InputMasksProps<V>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStrain, setCurrentStrain] = useState(props.masks[0])
  function onSelect(value: V, children: unknown, index: number) {
    const strain = props.masks[index]

    setCurrentStrain(strain)
    props.onSelect(strain)

    setIsExpanded(false)
  }
  useClickAway(parentRef, () => setIsExpanded(false))
  
  return (
    <div className="input-masks" ref={parentRef}>
      <button className="input-masks__current" type="button" onClick={() => setIsExpanded(!isExpanded)} >
        {currentStrain.title}
        <Icon className={classWithModifiers("input-masks__icon", isExpanded && "up")} name="chevron" />
      </button>
      <div className="input-masks__list">
        <DropDown<V> name={props.masksName} expanded={isExpanded} onSelect={onSelect}>
          {props.masks.map((mask, index) => (
            <option value={String(mask.value)} key={index}>{mask.title}</option>
          ))}
        </DropDown>
      </div>
    </div>
  )
}


export default Input
