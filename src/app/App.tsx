import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import { getPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import useDirectLogin from "hooks/useDirectLogin"
import { PageLinkType } from "interfaces/types"
import useLocalization from "modules/localization/hook"
import { PopupContainer } from "modules/popup/container"
import { Popup } from "modules/popup/controller"
import { StrictMode, Suspense, useRef, useState } from "react"
import { ClientContextProvider, useQuery } from "react-fetching-library"
import { Provider } from "react-redux"
import { Route, Routes } from "react-router"
import { BrowserRouter, NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import store from "redux/store"
import { classWithModifiers } from "utils/common"

import AdminEditableValue from "./components/admin/AdminEditableValue"
import AdminTopbar from "./components/admin/AdminTopbar"
import Button from "./components/common/Button/Button"
import Icon from "./components/common/Icon/Icon"
import PopupForm from "./components/popups/PopupForm"
import ErrorBoundary from "./components/services/ErrorBoundary"
import OuterLink from "./components/services/OuterLink"
import LangSelector from "./components/UI/LangSelector/LangSelector"
import AdminMailings from "./views/admin/AdminMailings/AdminMailings"
import AdminMentorsView from "./views/admin/AdminMentorsView/AdminMentorsView"
import AdminEditMentorView from "./views/admin/AdminMentorView/AdminEditMentorView"
import AdminNewMentorView from "./views/admin/AdminMentorView/AdminNewMentorView"
import AdminTopicsTagsView from "./views/admin/AdminTopicsView/AdminTopicsTagsView"
import HomeView from "./views/home/HomeView"
import MentorsView from "./views/mentors/MentorsView"
import MentorsViewTopicOrTag from "./views/mentors/MentorsView[topicOrTag]"
import UserUserId from "./views/user/User[userId]"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ClientContextProvider client={ClientAPI}>
            <Suspense fallback="Loading...">
              <ErrorBoundary fallback="Error">
                <Header />
                <Main />
                <Footer />
                <Cookies />
                <PopupContainer />
              </ErrorBoundary>
            </Suspense>
          </ClientContextProvider>
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
      <AdminTopbar />
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
            <button className="topbar-menu__link" type="button" onClick={() => Popup.open(PopupForm, { type: "become_mentor" })}>{ll.menu.becomeMentor}</button>
          </div>
          <Button style="outline" size="small" color="green" className="topbar-menu__button" onClick={() => Popup.open(PopupForm, { type: "choose_mentor" })}>{ll.findMentor}</Button>
          <LangSelector />
        </div>
      </div>
    </header>
  )
}



function Main() {
  useDirectLogin()
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/:shortcut" element={<HomeView />} />
        <Route path="/mentors" element={<MentorsView />} />
        <Route path="/mentors/:topicOrTag" element={<MentorsViewTopicOrTag />} />
        <Route path="/user/:userId" element={<UserUserId />} />
        {/* --- Admin --- */}
        {/* Mentors */}
        <Route path="/admin/mentors" element={<AdminMentorsView />} />
        <Route path="/admin/new-mentor" element={<AdminNewMentorView />} />
        <Route path="/admin/edit-mentor/:mentorId" element={<AdminEditMentorView />} />
        {/* Topics & Tags */}
        <Route path="/admin/topics-tags" element={<AdminTopicsTagsView />} />
        {/* Mailings */}
        <Route path="/admin/mailings" element={<AdminMailings />} />
        {/* --- Admin --- */}
      </Routes>
    </main>
  )
}

function Footer() {
  const ll = useLocalization(ll => ll.footer)
  const { payload } = useQuery(getPagesLinksDocuments)
  if (!payload) return null
  const links = payload.results.reduce<Record<PageLinkType["type"], PageLinkType>>((result, next) => ({ ...result, [next.type]: next }), {} as any)
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
              <div className="footer-links__title">{ll.linkGroups.service}</div>
              <Link className="footer-links__link" to="/mentors">{ll.links.mentors}</Link>
              <Link className="footer-links__link" to="/become-mentor">{ll.links.becomeMentor}</Link>
              <Link className="footer-links__link" to="/mentor-search">{ll.links.pickMentor}</Link>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{ll.linkGroups.docs}</div>
              <AdminEditableValue editingArea="links" id={links.user_agreement.id}>
                <OuterLink className="footer-links__link" to={links.user_agreement.url}>{ll.links.terms}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links.privacy_policy.id}>
                <OuterLink className="footer-links__link" to={links.privacy_policy.url}>{ll.links.privacyPolicy}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links.cookie_policy.id}>
                <OuterLink className="footer-links__link" to={links.cookie_policy.url}>{ll.links.cookiePolicy}</OuterLink>
              </AdminEditableValue>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{ll.linkGroups.help}</div>
              <AdminEditableValue editingArea="links" id={links.help.id}>
                <OuterLink className="footer-links__link" to={links.help.url}>{ll.links.support}</OuterLink>
              </AdminEditableValue>
            </div>
          </div>
          <div className="footer-links__social">
            <AdminEditableValue editingArea="links" id={links.facebook.id}>
              <div>
                <img src="/static/icons/facebook.svg" alt="facebook" />
                <OuterLink to={links.facebook.url} className="ghost" />
              </div>
            </AdminEditableValue>
            <AdminEditableValue editingArea="links" id={links.instagram.id}>
              <div>
                <img src="/static/icons/instagram.svg" alt="instagram" />
                <OuterLink to={links.instagram.url} className="ghost" />
              </div>
            </AdminEditableValue>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()}  Creaty.org — {ll.desc}
        </div>
      </div>
    </footer>
  )
}


function Cookies() {
  const ll = useLocalization(ll => ll.components.cookies)

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
      <p className="cookies__text">
        <OuterLink to="#">{ll.byRules}</OuterLink>
        {", "}
        {ll.desc}
      </p>
      <Button onClick={onClick}>{ll.button}</Button>
    </div>
  )
}


export default App
