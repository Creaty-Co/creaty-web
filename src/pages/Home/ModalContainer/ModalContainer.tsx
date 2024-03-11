import "./ModalContainer.scss"

import { bem, stopPropagation } from "@shared/utils/common"
import { closeModal, selectModalContainerActive, selectModalContainerContent } from "@store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "@store/store"
import { useCallback, useLayoutEffect, useRef } from "react"

// TODO: finish migration to ant d modal. Delete file after

const CN = "modal"
const { getElement, getModifier } = bem(CN)

export function ModalContainer() {
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
    <div className={getModifier(CN, isActive && "active")}>
      <div className={getElement("container")} onClick={stopPropagation(() => dispatch(closeModal()))}>
        <div className={getElement("inner")}>{elementContent}</div>
      </div>
    </div>
  )
}
