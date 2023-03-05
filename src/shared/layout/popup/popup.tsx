import "./popup.scss"

import { useAppDispatch } from "@app/store"
import { close } from "@shared/layout/modal"
import { ButtonIcon } from "@shared/ui"
import { bem } from "@shared/utils"
/* import ReactGA from "react-ga4" */
import cn from "classnames"
import { ReactNode /*, useEffect*/ } from "react"

const CN = "popup-layout"
const { getElement } = bem(CN)

export interface IPopupLayout {
  title: string
  width?: string
  children: ReactNode

  controlled?: boolean
  controll?: ReactNode
}

export function PopupLayout(props: IPopupLayout) {
  const dispatch = useAppDispatch()
  
  return (
    <div className={CN} style={{ width: props.width }}>
      
      <div className={getElement("close")}>
        <ButtonIcon 
          name="cross" size="small" color="white" outline 
          onClick={() => dispatch(close())} 
        />
      </div>
      
      <h3 className={cn(getElement("title"), "heading")}>
        {props.title}
      </h3>

      {props.controll && 
        <div className={getElement("controlled")}>
          {props.controll}
        </div>
      }
      
      <div className={getElement("container")}>
        {props.children}
      </div>
    </div>
  )
}

/*
  useEffect(() => {
    ReactGA.event({
      action: "Modal view update",
      category: "Modal view",
      label: component.toString()
    })
  }, [component])
  */
