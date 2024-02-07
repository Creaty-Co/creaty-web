import "./PopupLayout.scss"

import { bem } from "@shared/utils/common"
import { closeModal } from "@store/modalContainer.slice"
import { useAppDispatch } from "@store/store"
import cn from "classnames"
import { ReactNode } from "react"

import { SharedButtonIcon } from "../buttons/SharedButtonIcon"

// TODO: finish migration to ant d modal. Delete file after
const CN = "popup-layout"
const { getElement } = bem(CN)

export interface IPopupLayout {
  title: string | ReactNode
  subTitle?: string | ReactNode
  children: ReactNode

  hideCross?: boolean
  controlled?: boolean
  controll?: ReactNode

  shadow?: boolean
  black?: boolean
  onClose?: () => void
}

export function PopupLayout(props: IPopupLayout) {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    props.onClose?.() || dispatch(closeModal())
  }

  return (
    <div className={cn(getElement(props.shadow ? "shadow" : ""), getElement(props.black ? "black" : ""), CN)}>
      {!props.hideCross && (
        <div className={getElement("close")}>
          <SharedButtonIcon name="cross" size="small" color="white" outline onClick={handleClose} />
        </div>
      )}
      {typeof props.title === "string" ? (
        <h3 className={cn(getElement("title"), "heading")}>{props.title}</h3>
      ) : (
        props.title
      )}
      {typeof props.subTitle === "string" ? (
        <h5 className={cn(getElement("sub-title"), "heading")}>{props.subTitle}</h5>
      ) : (
        props.subTitle
      )}

      {props.controll && <div className={getElement("controlled")}>{props.controll}</div>}

      <div className={getElement("container")}>{props.children}</div>
    </div>
  )
}
