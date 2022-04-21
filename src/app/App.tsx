import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import { getPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import useDirectLogin from "hooks/useDirectLogin"
import { PageLinkType } from "interfaces/types"
import { UserType } from "interfaces/user"
import Localization from "modules/localization/controller"
import useLocalization from "modules/localization/hook"
import { ModalContainer } from "modules/modal/container"
import { Modal } from "modules/modal/controller"
import { StrictMode, Suspense, useEffect, useRef, useState } from "react"
import { ClientContextProvider, useQuery } from "react-fetching-library"
import ReactGA from "react-ga4"
import { Provider, useSelector } from "react-redux"
import { Route, Routes } from "react-router"
import { useLocation } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import store from "redux/store"
import { classWithModifiers } from "utils/common"

import AppInit from "./AppInit"
import AdminEditableValue from "./components/admin/AdminEditableValue"
import AdminTopbar from "./components/admin/AdminTopbar"
import Button from "./components/common/Button/Button"
import ButtonLink from "./components/common/Button/ButtonLink"
import Icon from "./components/common/Icon/Icon"
import PopupForm from "./components/popups/PopupForm"
import ErrorBoundary from "./components/services/ErrorBoundary"
import OuterLink from "./components/services/OuterLink"
import LangSelector from "./components/UI/LangSelector/LangSelector"
import AdminFormsView from "./views/admin/AdminFormsView/AdminFormsView"
import AdminMailings from "./views/admin/AdminMailings/AdminMailings"
import AdminMentorsView from "./views/admin/AdminMentorsView/AdminMentorsView"
import AdminEditMentorView from "./views/admin/AdminMentorView/AdminEditMentorView"
import AdminNewMentorView from "./views/admin/AdminMentorView/AdminNewMentorView"
import AdminTagsView from "./views/admin/AdminTopicsView/AdminTagsView"
import AdminTopicsView from "./views/admin/AdminTopicsView/AdminTopicsView"
import ErrorView from "./views/error/ErrorView"
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
                <AppInit />

                <Header />
                <Main />
                <Footer />
                <Cookies />
                <ModalContainer />
                <ToastContainer />
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
  const location = useLocation()
  useEffect(() => ReactGA.send({
    hitType: "pageview",
    view: location.pathname + location.search + location.hash
  }), [location])
  return (
    <header>
      <AdminTopbar />
      <div className="topbar">
        <div aria-label="Home">
          <img src="/static/images/logo.svg" alt="logo" className="topbar__logo" />
          <img src="/static/icons/logo.svg" alt="logo" className="topbar__logo topbar__logo--mobile" />
          <Link className="ghost" to="/" />
        </div>
        <Icon className="topbar__trigger" name={expanded ? "cross" : "menu"} onClick={() => setExpanded(!expanded)} />
        <div className={classWithModifiers("topbar__right", expanded && "expanded")}>
          <div className="topbar-menu">
            <ButtonLink to="/mentors">{ll.menu.mentors}</ButtonLink>
            <Button onClick={() => Modal.open(PopupForm, { type: "become_mentor" })}>{ll.menu.becomeMentor}</Button>
          </div>
          <Button style="outline" size="small" color="green" className="topbar-menu__button" onClick={() => Modal.open(PopupForm, { type: "choose_mentor" })}>{ll.findMentor}</Button>
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
        <Route path="/">
          <Route index element={<HomeView />} />
          <Route path=":shortcut" element={<HomeView />} />
          <Route path="mentors" element={<MentorsView />} />
          <Route path="mentors/:topicOrTag" element={<MentorsViewTopicOrTag />} />
          <Route path="user/:userId" element={<UserUserId />} />
          <Route path="admin/*" element={<AdminViews />} />
        </Route>
        <Route path="/*" element={<ErrorView />} />
      </Routes>
    </main>
  )
}

function AdminViews() {
  const user = useSelector(state => state.user)
  if (!user.auth || user.type < UserType.admin) return null
  return (
    <Routes>
      {/* Mentors */}
      <Route path="/mentors" element={<AdminMentorsView />} />
      <Route path="/new-mentor" element={<AdminNewMentorView />} />
      <Route path="/edit-mentor/:mentorId" element={<AdminEditMentorView />} />
      {/* Topics & Tags */}
      <Route path="/topics" element={<AdminTopicsView />} />
      <Route path="/tags" element={<AdminTagsView />} />
      {/* Mailings */}
      <Route path="/mailings" element={<AdminMailings />} />
      {/* Forms */}
      <Route path="/forms" element={<AdminFormsView />} />
    </Routes>
  )
}

function Footer() {
  const ll = useLocalization(ll => ll.footer)
  const { error, payload, headers } = useQuery(getPagesLinksDocuments)

  useEffect(() => {
    const nextLang = location.hostname.split(".")[0]

    if (Localization.getLangs().includes(nextLang)) {
      Localization.transit(nextLang)
    }
  }, [headers])

  if (error || !payload) return null
  const links = payload.results.reduce<Record<PageLinkType["type"], PageLinkType>>((result, next) => ({ ...result, [next.type]: next }), {} as never)
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
              <button className="footer-links__link" type="button" onClick={() => Modal.open(PopupForm, { type: "become_mentor" })}>{ll.links.becomeMentor}</button>
              <button className="footer-links__link" type="button" onClick={() => Modal.open(PopupForm, { type: "choose_mentor" })}>{ll.links.pickMentor}</button>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{ll.linkGroups.docs}</div>
              <AdminEditableValue editingArea="links" id={links.user_agreement.id}>
                <OuterLink className="footer-links__link" to={links.user_agreement.url} eventLabel="terms">{ll.links.terms}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links.privacy_policy.id}>
                <OuterLink className="footer-links__link" to={links.privacy_policy.url} eventLabel="privacyPolicy">{ll.links.privacyPolicy}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links.cookie_policy.id}>
                <OuterLink className="footer-links__link" to={links.cookie_policy.url} eventLabel="cookiePolicy">{ll.links.cookiePolicy}</OuterLink>
              </AdminEditableValue>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{ll.linkGroups.help}</div>
              <AdminEditableValue editingArea="links" id={links.help.id}>
                <OuterLink className="footer-links__link" to={links.help.url} eventLabel="help">{ll.links.support}</OuterLink>
              </AdminEditableValue>
            </div>
          </div>
          <div className="footer-links__social">
            <AdminEditableValue editingArea="links" id={links.facebook.id}>
              <div>
                <img src="/static/icons/facebook.svg" alt="facebook" />
                <OuterLink to={links.facebook.url} className="ghost" eventLabel="facebook" />
              </div>
            </AdminEditableValue>
            <AdminEditableValue editingArea="links" id={links.instagram.id}>
              <div>
                <img src="/static/icons/instagram.svg" alt="instagram" />
                <OuterLink to={links.instagram.url} className="ghost" eventLabel="instagram" />
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

  const { payload } = useQuery(getPagesLinksDocuments)
  if (!payload) return null

  const cookiePolicy = payload.results.find(l => l.type === "cookie_policy")
  if (!cookiePolicy) return null
  return (
    <div className={classWithModifiers("cookies", cookies === "accept" && "accept")}>
      <p className="cookies__text">
        <AdminEditableValue editingArea="links" id={cookiePolicy.id}>
          <OuterLink to={cookiePolicy.url} eventLabel="cookiePolicy">{ll.byRules}</OuterLink>
        </AdminEditableValue>
        {", "}
        {ll.desc}
      </p>
      <Button onClick={onClick}>{ll.button}</Button>
    </div>
  )
}


export default App
