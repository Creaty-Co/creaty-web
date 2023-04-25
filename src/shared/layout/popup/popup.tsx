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
  title: string | React.ReactNode
  width?: string
  children: ReactNode

  controlled?: boolean
  controll?: ReactNode

  className?: string
  theme?: "dark" | "light"
}

export function PopupLayout({
  className,
  theme = "light",

  width,
  title,

  controll,
  children,
}: IPopupLayout) {
  const dispatch = useAppDispatch()
  
  return (
    <div 
      className={cn(CN, className, theme === "light"? "bg-white": `bg-black-900 ${CN}--dark`)} 
      style={{ width: width }}
    >

      <div className={getElement("close")}>
        <ButtonIcon 
          name="cross" size="small" color="white" outline 
          onClick={() => dispatch(close())} 
        />
      </div>

      <h3 className={cn(getElement("title"), "heading")}>
        {title}
      </h3>

      {controll && 
        <div className={getElement("controlled")}>
          {controll}
        </div>
      }

      <div className={getElement("container")}>
        {children}
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
