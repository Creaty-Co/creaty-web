import "./CheckTree.scss"

import Icon from "app/components/common/Icon/Icon"
import { ReactElement, ReactNode, useState } from "react"
import { classWithModifiers } from "utils/common"

type CheckTreeOption<V = unknown> = ReactElement<{
  title: ReactNode
  value?: V
  children?: CheckTreeOptionChildren
}>
type CheckTreeOptionChildren = CheckTreeOption | CheckTreeOption[]

interface CheckTreeProps<V> {
  name?: string
  defaultChecks?: V[]
  children: any
}

function CheckTree<V>(props: CheckTreeProps<V>) {
  const [checks, setChecks] = useState<unknown[]>(props.defaultChecks || [])
  const [cursor, setCursor] = useState<number[]>([])
  function onCheck(value: unknown) {
    if (checks.includes(value)) {
      return uncheck(value)
    }
    check(value)
  }
  function check(value: unknown) {
    setChecks(state => [...state, value])
  }
  function uncheck(value: unknown) {
    setChecks(state => state.filter(comparedValue => comparedValue !== value))
  }

  const children = toArrayDeeply(props.children)

  const childrenOptions = children.filter(child => child.type === "option") as CheckTreeOption<V>[]
  const childrenRest = children.filter(child => child.type !== "option")

  return (
    <div className="check-tree">
      <div className="check-tree__list">
        <CheckTreeColumn>
          {childrenRest}
          {childrenOptions.map((child, index) => (
            <CheckTreeRow active={cursor[0] === index} onClick={child.props.children ? (() => (setCursor([index]))) : undefined} key={index}>
              {child.props.value == null && (
                child.props.title
              )}
              {child.props.value && (
                <CheckTreeCheckBox {...child.props} value={child.props.value} checked={checks.includes(child.props.value)} />
              )}
            </CheckTreeRow>
          ))}
        </CheckTreeColumn>
        {cursor.map(columnIndex => (
          <CheckTreeColumn key={columnIndex}>
            {toArrayDeeply(childrenOptions[columnIndex].props.children).map((child, index) => (
              child.type === "option"
                ? (
                  <CheckTreeRow active={cursor[columnIndex + 1] === index} expanded={!!child.props.children} onClick={() => ((child.props.children ? setCursor([...cursor.slice(0, columnIndex), index]) : undefined), onCheck(child.props.value))} key={index}>
                    <CheckTreeCheckBox {...child.props} name={props.name} checked={checks.includes(child.props.value)} />
                  </CheckTreeRow>
                )
                : (
                  child
                )
            ))}
          </CheckTreeColumn>
        ))}
      </div>
    </div >
  )
}

function toArrayDeeply<T>(obj?: T | T[]): T[] {
  if (obj == null) return []
  return obj instanceof Array ? obj.flatMap(v => v) : [obj]
}



interface CheckTreeCheckBoxProps<V> {
  name?: string
  title: ReactNode
  value?: V
  checked: boolean
}

function CheckTreeCheckBox<V>(props: CheckTreeCheckBoxProps<V>) {
  return (
    <>
      <input name={props.name} type="checkbox" checked={props.checked} value={props.value && String(props.value)} />
      <span>{props.title}</span>
    </>
  )
}



// function parseOptionData(children: CheckTreeOptionChildren): {
//   title: ReactNode
//   value: unknown
// }[] {
//   const childrenArray = children instanceof Array ? children : [children]
//   const result: unknown[] = []

//   for (const child of childrenArray) {
//     result.push(child.props.value)

//     if (child.props.children) {
//       result.push(...parseOptionData(child.props.children))
//     }
//   }

//   return result
// }




interface CheckTreeColumnProps {
  children: ReactNode
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
  children?: ReactNode
  onClick?(): void
}

function CheckTreeRow(props: CheckTreeRowProps) {
  return (
    <div className={classWithModifiers("check-tree-row", props.active && "active")} role="option" onClick={props.onClick}>
      <div className="check-tree-row__title">{props.children}</div>
      {props.expanded && (
        <Icon className="check-tree-row__icon" name="chevron" />
      )}
    </div>
  )
}




export default CheckTree
