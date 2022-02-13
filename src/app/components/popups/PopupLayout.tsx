import "app/assets/scss/popup.scss"

import { ReactNode, useEffect } from "react"

import Icon from "../common/Icon/Icon"


interface PopupLayoutProps {
  title: string
  width?: string
  children: ReactNode
}

function PopupLayout(props: PopupLayoutProps) {
  const { close } = usePopupContext()
  return (
    <div className="popup-layout" style={{ width: props.width }}>
      <button className="popup-layout__close" type="button" onClick={close}><Icon name="cross" /></button>
      <h3 className="popup-layout__title heading">{props.title}</h3>
      <div className="popup-layout__container">{props.children}</div>
    </div>
  )
}


export default PopupLayout
