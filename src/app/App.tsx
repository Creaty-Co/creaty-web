import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import useLocalization from "modules/localization/hook"
import { StrictMode, Suspense } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter, NavLink } from "react-router-dom"
import { Link } from "react-router-dom"

import Button from "./components/common/Button/Button"
import ErrorBoundary from "./components/services/ErrorBoundary"
import OuterLink from "./components/services/OuterLink"
import LangSelector from "./components/UI/LangSelector/LangSelector"
import HomeView from "./views/home/HomeView"
import MentorsView from "./views/mentors/MentorsView"

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
  const ll = useLocalization(ll => ll.header)
  return (
    <header>
      <div className="topbar">
        <div>
          <img src="/static/images/logo40.png" alt="logo" className="topbar__logo" />
          <Link className="ghost" to="/" />
        </div>
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
    <main>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/mentors" element={<MentorsView />} />
      </Routes>
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links">
          <div>
            <img src="/static/icons/logo.svg" alt="logo" className="footer-links__logo" />
            <Link className="ghost" to="/" />
          </div>
          <div className="footer-links__container">
            <div className="footer-links__group">
              <div className="footer-links__title">Сервис</div>
              <Link className="footer-links__link" to="/mentors">Менторы</Link>
              <Link className="footer-links__link" to="/become-mentor">Стать ментором</Link>
              <Link className="footer-links__link" to="/mentor-search">Подобрать ментора</Link>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">Документы</div>
              <OuterLink className="footer-links__link" to="//mentors">Пользовательское соглашение</OuterLink>
              <OuterLink className="footer-links__link" to="//become-mentor">Политика конфиденциальности</OuterLink>
              <OuterLink className="footer-links__link" to="//mentor-search">Cookie  Policy</OuterLink>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">Помощь</div>
              <OuterLink className="footer-links__link" to="mailto:@become-mentor">Написать в поддержку</OuterLink>
            </div>
          </div>
          <div className="footer-links__social">
            <div>
              <img src="/static/icons/facebook.svg" alt="facebook" />
              <OuterLink to="//facebook.com" className="ghost" />
            </div>
            <div>
              <img src="/static/icons/instagram.svg" alt="instagram" />
              <OuterLink to="//instagram.com" className="ghost" />
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()}  Creaty.org — educational platform for searching professional mentors in creative fields. Correspondence address: [address]
        </div>
      </div>
    </footer>
  )
}


export default App
