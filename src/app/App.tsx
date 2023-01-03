import "app/assets/scss/base.scss"
import "app/assets/scss/app.scss"

import { getPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import useDirectLogin from "hooks/useDirectLogin"
import ReactJSONEditorContainer from "i18n/react-json-editor-thirdParty"
import i18next from "i18next"
import { PageLinkType } from "interfaces/types"
import { UserType } from "interfaces/user"
import { ModalContainer } from "modules/modal/container"
import { Modal } from "modules/modal/controller"
import { StrictMode, Suspense, useEffect, useRef, useState } from "react"
import { ClientContextProvider, useQuery } from "react-fetching-library"
import ReactGA from "react-ga4"
import { I18nextProvider, useTranslation } from "react-i18next"
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
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <ClientContextProvider client={ClientAPI}>
              <Suspense fallback="">
                <ErrorBoundary fallback="Error">
                  <AppInit />

                  <Header />
                  <Main />
                  <Footer />
                  <Cookies />
                  <ModalContainer />
                  <ToastContainer />
                  <AdminJSONEditorContainer />
                </ErrorBoundary>
              </Suspense>
            </ClientContextProvider>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

function AdminJSONEditorContainer() {
  const user = useSelector(state => state.user)
  const admin = useSelector(state => state.admin)

  if (!user.auth) return null
  if (user.type < UserType.admin) return null

  if (!admin.editing) return null

  return (
    <ReactJSONEditorContainer i18n={i18next} />
  )
}

function Header() {
  const { t } = useTranslation("translation", { keyPrefix: "header" })
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
            <ButtonLink size="small" to="/mentors">{t("menu.mentors")}</ButtonLink>
            <Button size="small" onClick={() => Modal.open(PopupForm, { type: "become_mentor", weak: true })}>{t("menu.becomeMentor")}</Button>
          </div>
          <Button outline size="small" color="green" onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>{t("findMentor")}</Button>
          {/* <LangSelector /> */}
        </div>
      </div>
    </header>
  )
}



function Main() {
  console.log(123)
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
  const { t } = useTranslation("translation", { keyPrefix: "footer" })
  const { error, payload } = useQuery(getPagesLinksDocuments)

  const links = payload?.results.reduce<Record<PageLinkType["type"], PageLinkType>>((result, next) => ({ ...result, [next.type]: next }), {} as never)
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
              <div className="footer-links__title">{t("linkGroups.service")}</div>
              <Link className="footer-links__link" to="/mentors">{t("links.mentors")}</Link>
              <button className="footer-links__link" type="button" onClick={() => Modal.open(PopupForm, { type: "become_mentor", weak: true })}>{t("links.becomeMentor")}</button>
              <button className="footer-links__link" type="button" onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>{t("links.pickMentor")}</button>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{t("linkGroups.docs")}</div>
              <AdminEditableValue editingArea="links" id={links?.user_agreement.id || ""}>
                <OuterLink className="footer-links__link" to={links?.user_agreement.url || ""} eventLabel="terms">{t("links.terms", { policyLink: links?.privacy_policy.url })}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links?.privacy_policy.id || ""}>
                <OuterLink className="footer-links__link" to={links?.privacy_policy.url || ""} eventLabel="privacyPolicy">{t("links.privacyPolicy")}</OuterLink>
              </AdminEditableValue>
              <AdminEditableValue editingArea="links" id={links?.cookie_policy.id || ""}>
                <OuterLink className="footer-links__link" to={links?.cookie_policy.url || ""} eventLabel="cookiePolicy">{t("links.cookiePolicy")}</OuterLink>
              </AdminEditableValue>
            </div>
            <div className="footer-links__group">
              <div className="footer-links__title">{t("linkGroups.help")}</div>
              <AdminEditableValue editingArea="links" id={links?.help.id || ""}>
                <OuterLink className="footer-links__link" to={links?.help.url || ""} eventLabel="help">{t("links.support")}</OuterLink>
              </AdminEditableValue>
            </div>
          </div>
          <div className="footer-links__social">
            <AdminEditableValue editingArea="links" id={links?.facebook.id || ""}>
              <div>
                <img src="/static/icons/facebook.svg" alt="facebook" />
                <OuterLink to={links?.facebook.url || ""} className="ghost" eventLabel="facebook" />
              </div>
            </AdminEditableValue>
            <AdminEditableValue editingArea="links" id={links?.instagram.id || ""}>
              <div>
                <img src="/static/icons/instagram.svg" alt="instagram" />
                <OuterLink to={links?.instagram.url || ""} className="ghost" eventLabel="instagram" />
              </div>
            </AdminEditableValue>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()}  Creaty.org — {t("desc")}
        </div>
      </div>
    </footer>
  )
}


function Cookies() {
  const { t } = useTranslation("translation", { keyPrefix: "components.cookies" })

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
          <OuterLink to={cookiePolicy.url} eventLabel="cookiePolicy">{t("byRules")}</OuterLink>
        </AdminEditableValue>
        {", "}
        {t("desc")}
      </p>
      <Button onClick={onClick}>{t("button")}</Button>
    </div>
  )
}


export default App
