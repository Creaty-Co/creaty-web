import "./modal.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { bem, stopPropagation } from "@shared/utils"
import cn from "classnames"

import { close, selectModalActive, selectModalContent } from "./modal.slice"

export interface IModalContainer {
  className?: string
}

const CN = "modal"
const { getElement, getModifier } = bem(CN)

export function ModalContainer({
  className,
}: IModalContainer) {
  const dispatch = useAppDispatch()

  const elementContent = useAppSelector(selectModalContent())
  const isActive = useAppSelector(selectModalActive())

  return (
    <div className={cn(
      getModifier(CN, isActive && "active"), 
      className
    )}>
      <div 
        className={getElement("container")}
        onClick={stopPropagation(() => dispatch(close()))}
      >
        <div className={getElement("inner")}>
          {elementContent}
        </div>
      </div>
    </div>
  )
}
