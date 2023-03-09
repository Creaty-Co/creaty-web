import { Footer } from "@shared/ui"
import { Header } from "@widgets"
import { ReactNode } from "react"

export interface ILayoutPage {
  children: ReactNode
}

export const LayoutPage = ({
  children
}: ILayoutPage) => (
  <>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </>
)