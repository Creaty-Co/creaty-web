import "app/assets/scss/popup.scss"

import { usePopupContext } from "modules/popup/hook"
import { ReactNode } from "react"


interface PopupLayoutProps {
  title: string
  width?: string
  children: ReactNode
}

function PopupLayout(props: PopupLayoutProps) {
  usePopupContext()
  return (
    <div className="popup-layout" style={{ width: props.width }}>
      <h3 className="popup-layout__title heading">{props.title}</h3>
      <div className="popup-layout__container">{props.children}</div>
    </div>
  )
}


export default PopupLayout
