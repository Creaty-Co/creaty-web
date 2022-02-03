import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import useLocalization from "modules/localization/hook"
import { StrictMode, Suspense, useRef, useState } from "react"
import { Provider } from "react-redux"
import { Route, Routes } from "react-router"
import { BrowserRouter, NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import store from "redux/store"
import { classWithModifiers } from "utils/common"

import Button from "./components/common/Button/Button"
import Icon from "./components/common/Icon/Icon"
import ErrorBoundary from "./components/services/ErrorBoundary"
import OuterLink from "./components/services/OuterLink"
import LangSelector from "./components/UI/LangSelector/LangSelector"
import HomeView from "./views/home/HomeView"
import MentorsView from "./views/mentors/MentorsView"
import MentorsViewTopicOrTag from "./views/mentors/MentorsView[topicOrTag]"
import UserUserId from "./views/user/User[userId]"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback="Loading...">
            <ErrorBoundary fallback="Error">
              <Header />
              <Main />
              <Footer />
              <Cookies />
            </ErrorBoundary>
          </Suspense>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

function Header() {
  const ll = useLocalization(ll => ll.header)
  const [expanded, setExpanded] = useState(false)
  return (
    <header>
      <div className="topbar">
        <div aria-label="Home">
          <img src="/static/images/logo40.png" alt="logo" className="topbar__logo" />
          <img src="/static/icons/logo.svg" alt="logo" className="topbar__logo topbar__logo--mobile" />
          <Link className="ghost" to="/" />
        </div>
        <Icon className="topbar__trigger" name={expanded ? "cross" : "menu"} onClick={() => setExpanded(!expanded)} />
        <div className={classWithModifiers("topbar__right", expanded && "expanded")}>
          <div className="topbar-menu">
            <NavLink className="topbar-menu__link" to="/mentors">{ll.menu.mentors}</NavLink>
            <NavLink className="topbar-menu__link" to="/become-mentor">{ll.menu.becomeMentor}</NavLink>
          </div>
          <Button style="outline" size="small" color="green" className="topbar-menu__button">{ll.findMentor}</Button>
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
        <Route path="/mentors/:topicOrTag" element={<MentorsViewTopicOrTag />} />
        <Route path="/user/:userId" element={<UserUserId />} />
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


function Cookies() {
  const cookiesRef = useRef(localStorage.getItem("cookies"))
  const [cookies, setCookies] = useState("")
  function onClick() {
    setCookies("accept")
    localStorage.setItem("cookies", "accept")
  }
  if (cookiesRef.current === "accept") {
    return null
  }
  return (
    <div className={classWithModifiers("cookies", cookies === "accept" && "accept")}>
      <p className="cookies__text">Мы сохраняем cookie <a href="#">по правилам</a>, чтобы персонализировать сервис.Вы можете запретить это изменив настройки браузера.</p>
      <Button onClick={onClick}>Хорошо</Button>
    </div>
  )
}


export default App
