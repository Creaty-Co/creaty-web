import { ReactNode } from "react"

type ButtonSize = "little" | "small" | "big" | "biggest"
type ButtonColor = "dark" | "white" | "green" | "violet" | "google" 

export interface ButtonBaseProps {
  size?: ButtonSize
  color?: ButtonColor
  outline?: boolean

  className?: string

  iconLeft?: ReactNode
  iconRight?: ReactNode

  children: ReactNode
}
