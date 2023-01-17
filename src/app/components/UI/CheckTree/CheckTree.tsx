import "./CheckTree.scss"

import Icon from "app/components/common/Icon/Icon"
import { ReactNode, useState } from "react"
import { classWithModifiers } from "utils/common"

import Checkbox from "../Checkbox/Checkbox"
import TopicTag from "../Tag/TopicTag"
import { CheckTreeOption, CheckTreeOptionChildren, CheckTreeState } from "./CheckTree.types"


interface CheckTreeProps<V> {
  name?: string
  defaultChecks?: V[]
  children: CheckTreeOptionChildren<V>
}

function CheckTree<V>(props: CheckTreeProps<V>) {
  const [values, setValues] = useState<CheckTreeState<V>>(props.defaultChecks || [])
  const [cursor, setCursor] = useState<number[]>([0])
  function onCheck(value: V) {
    if (values.includes(value)) {
      return uncheck(value)
    }
    check(value)
  }
  function check(value: V) {
    if (value == null) return
    setValues(state => [...state, value])
  }
  function uncheck(value: V) {
    if (values.length === 1) return
    setValues(state => state.filter(comparedValue => comparedValue !== value))
  }
  const children = toArrayDeeply<CheckTreeOption<V> | ReactNode>(props.children)
  return (
    <div className="check-tree">
      <div className="check-tree-show">
        {values.map((value, index) => (
          <div className="check-tree-show__check" key={index}>
            {/* --- Trash Code --- */}
            {/* eslint-disable-next-line */}
            <TopicTag noHash onClick={() => uncheck(value)}>{String((children as any).flatMap((d: any) => (d?.props?.children && d?.type === "option") ? [d, ...toArrayDeeply(d.props.children)] : d).find((option: any) => option?.props?.value === value)?.props?.title)}</TopicTag>
            {/* --- Trash Code --- */}
            <input type="hidden" name={props.name} value={value && String(value)} key={index} />
          </div>
        ))}
      </div>
      <div className="check-tree__list">
        <CheckTreeColumn>
          {children.map(selectOptionPredicate((child, index) => (
            <CheckTreeRow active={cursor[0] === index} expanded={!!child.props.children} onClick={() => ((child.props.children ? setCursor([index]) : undefined), onCheck(child.props.value as V))} key={index}>
              {child.props.value == null && (
                child.props.title
              )}
              {!!child.props.value && (
                <Checkbox value={child.props.value} checked={values.includes(child.props.value as V)} onClick={event => event.stopPropagation()}>
                  {child.props.title}
                </Checkbox>
              )}
            </CheckTreeRow>
          )))}
        </CheckTreeColumn>
        {cursor.map(columnIndex => (
          <CheckTreeColumn key={columnIndex}>
            {toArrayDeeply((children[columnIndex] as CheckTreeOption<V>).props.children).map(selectOptionPredicate((child, index) => (
              <CheckTreeRow active={cursor[columnIndex + 1] === index} expanded={!!child.props.children} onClick={() => ((child.props.children ? setCursor([...cursor.slice(0, columnIndex + 1), index]) : undefined), onCheck(child.props.value as V))} key={index}>
                <Checkbox value={child.props.value} checked={values.includes(child.props.value as V)} onClick={event => event.stopPropagation()}>
                  {child.props.title}
                </Checkbox>
              </CheckTreeRow>
            )))}
          </CheckTreeColumn>
        ))}
      </div>
    </div>
  )
}

function selectOptionPredicate<V, T extends CheckTreeOption<V> | ReactNode, U>(predicate: (value: CheckTreeOption<V>, index: number, array: T[]) => U) {
  return (value: T, index: number, array: T[]): U | ReactNode => {
    if (!(value instanceof Object)) return value
    if (!("type" in value)) return value
    if (value.type !== "option") return value

    return predicate(value, index, array)
  }
}

function toArrayDeeply<T>(obj?: T | T[]): T[] {
  if (obj == null) return []
  return obj instanceof Array ? obj.flatMap(v => v) : [obj]
}



interface CheckTreeColumnProps {
  children: ReactNode | ReactNode[]
}

function CheckTreeColumn(props: CheckTreeColumnProps) {
  return (
    <div className="check-tree__column" role="listbox">
      {props.children}
    </div>
  )
}




interface CheckTreeRowProps {
  active?: boolean
  expanded?: boolean
  children?: ReactNode | ReactNode[]
  onClick?(): void
}

function CheckTreeRow(props: CheckTreeRowProps) {
  return (
    <div className={classWithModifiers("check-tree-row", props.active && "active")} role={props.expanded ? "option" : undefined} onClick={props.onClick}>
      <div className="check-tree-row__title">{props.children}</div>
      {props.expanded && (
        <Icon className="check-tree-row__icon" name="chevron" />
      )}
    </div>
  )
}




export default CheckTree
