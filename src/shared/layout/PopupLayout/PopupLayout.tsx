import "./PopupLayout.scss"

import { useAppDispatch } from "@app/store"
import { ButtonIcon } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode } from "react"

import { close } from "../index"

const CN = "popup-layout"
const { getElement } = bem(CN)

export interface IPopupLayout {
  title: string | ReactNode
  subTitle?: string | ReactNode
  children: ReactNode

  unClosable?: boolean
  controlled?: boolean
  controll?: ReactNode

  shadow?: boolean
  black?: boolean
  onClose?: () => void
}

export function PopupLayout(props: IPopupLayout) {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    props.onClose?.() || dispatch(close())
  }

  return (
    <div className={cn(getElement(props.shadow ? "shadow" : ""), getElement(props.black ? "black" : ""), CN)}>
      {!props.unClosable && (
        <div className={getElement("close")}>
          <ButtonIcon name="cross" size="small" color="white" outline onClick={handleClose} />
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
