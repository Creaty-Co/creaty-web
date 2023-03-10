import "./modal.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { bem, stopPropagation } from "@shared/utils"
import cn from "classnames"
import { useLayoutEffect, useRef } from "react"

import { close, selectModalActive, selectModalContent } from "./modal.slice"

export interface IModalContainer {
  className?: string
}

const CN = "modal"
const { getElement, getModifier } = bem(CN)

export function ModalContainer({
  className,
}: IModalContainer) {
  const scrollTopOffsetRef = useRef<number>(0)
  const dispatch = useAppDispatch()

  const elementContent = useAppSelector(selectModalContent())
  const isActive = useAppSelector(selectModalActive())

  useLayoutEffect(() => {
    if (isActive) {
      scrollTopOffsetRef.current = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollTopOffsetRef.current}px`
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(`${scrollTopOffsetRef.current}` || "0") )
    }
  }, [isActive])

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
          { elementContent }
        </div>
      </div>
    </div>
  )
}
