import { ReactNode } from "react"

export interface LayoutPropsType {
  children: ReactNode
}

export const Layout = ({
  children
}: LayoutPropsType) => (
  <>
    {children}
  </>
)