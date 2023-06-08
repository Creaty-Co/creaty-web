import "./modalContainer.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { bem, stopPropagation } from "@shared/utils"
import cn from "classnames"
import { useCallback, useLayoutEffect, useRef } from "react"

import { closeModal, selectModalContainerActive, selectModalContainerContent } from "./modalContainerSlice"

export interface IModalContainer {
  className?: string
}

const CN = "modal"
const { getElement, getModifier } = bem(CN)

export function ModalContainer({ className }: IModalContainer) {
  const scrollTopOffsetRef = useRef<number>(0)
  const dispatch = useAppDispatch()

  const elementContent = useAppSelector(selectModalContainerContent())
  const isActive = useAppSelector(selectModalContainerActive())

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") dispatch(closeModal())
    },
    [isActive]
  )

  useLayoutEffect(() => {
    if (isActive) {
      scrollTopOffsetRef.current = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollTopOffsetRef.current}px`

      window.addEventListener("keydown", handleEscKey)
      return () => window.removeEventListener("keydown", handleEscKey)
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(`${scrollTopOffsetRef.current}` || "0"))
    }
  }, [isActive])

  return (
    <div className={cn(getModifier(CN, isActive && "active"), className)}>
      <div className={getElement("container")} onClick={stopPropagation(() => dispatch(closeModal()))}>
        <div className={getElement("inner")}>{elementContent}</div>
      </div>
    </div>
  )
}
