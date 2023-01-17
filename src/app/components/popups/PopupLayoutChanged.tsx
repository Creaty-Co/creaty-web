import "./PopupLayoutChanged.scss"

import { useModal } from "modules/modal/hook"
import { ReactNode, useEffect } from "react"
import ReactGA from "react-ga4"

import ButtonIcon from "../common/Button/ButtonIcon"

/*
type ControllAction = {
  title: string
  handler: () => void
}
*/

interface PopupLayoutChangedProps {
  title: string
  width?: string
  children: ReactNode

  controlled?: boolean
  controll?: ReactNode
}

function PopupLayoutChanged(props: PopupLayoutChangedProps) {
  const { close, component } = useModal()
  useEffect(() => {
    ReactGA.event({
      action: "Modal view update",
      category: "Modal view",
      label: component.toString()
    })
  }, [component])
  return (
    <div className="popup-layout" style={{ width: props.width }}>
      
      <div className="popup-layout__close">
        <ButtonIcon name="cross" size="small" color="white" outline onClick={close} />
      </div>
      
      <h3 className="popup-layout__title heading">{props.title}</h3>

      {props.controll && <div className="popup-layout__controlled">
        {props.controll}
      </div>}
      
      <div className="popup-layout__container">
        {props.children}
      </div>
    </div>
  )
}

export default PopupLayoutChanged
