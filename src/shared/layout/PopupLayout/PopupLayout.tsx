import "./popupLayout.scss"

import { useAppDispatch } from "@app/store"
import { ButtonIcon } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode } from "react"

import { close } from "../index"

const CN = "popup-layout"
const { getElement } = bem(CN)

export interface IPopupLayout {
  title: string
  width?: string
  subTitle?: string
  children: ReactNode

  unClosable?: boolean
  controlled?: boolean
  controll?: ReactNode
  onClose?: () => void
}

export function PopupLayout(props: IPopupLayout) {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    props.onClose?.() || dispatch(close())
  }

  return (
    <div className={CN} style={{ width: props.width }}>
      {!props.unClosable && (
        <div className={getElement("close")}>
          <ButtonIcon name="cross" size="small" color="white" outline onClick={handleClose} />
        </div>
      )}

      <h3 className={cn(getElement("title"), "heading")}>{props.title}</h3>
      {props.subTitle && <h5 className={cn(getElement("sub-title"), "heading")}>{props.subTitle}</h5>}

      {props.controll && <div className={getElement("controlled")}>{props.controll}</div>}

      <div className={getElement("container")}>{props.children}</div>
    </div>
  )
}
