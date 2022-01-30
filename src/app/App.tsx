import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import useLocalization from "modules/localization/hook"
import { StrictMode, Suspense } from "react"
import { BrowserRouter, NavLink } from "react-router-dom"

import Button from "./components/common/Button/Button"
import ErrorBoundary from "./components/services/ErrorBoundary"
import LangSelector from "./components/UI/LangSelector/LangSelector"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <ErrorBoundary fallback="Error">
            <Header />
            <Main />
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
}

function Header() {
  const ll = useLocalization(trans => trans.header)
  return (
    <header>
      <div className="topbar">
        <img src="/static/images/logo40.png" alt="logo" className="topbar__logo" />
        <div className="topbar__right">
          <div className="topbar-menu">
            <NavLink className="topbar-menu__link" to="/mentors">{ll.menu.mentors}</NavLink>
            <NavLink className="topbar-menu__link" to="/become-mentor">{ll.menu.becomeMentor}</NavLink>
          </div>
          <Button style="outline" size="small" color="green">{ll.findMentor}</Button>
          <LangSelector />
        </div>
      </div>
    </header>
  )
}



function Main() {
  return (
    <main></main>
  )
}

function Footer() {
  return (
    <footer></footer>
  )
}


export default App
