import "./assets/scss/base.scss"
import "./assets/scss/app.scss"

import { Router } from "@pages"
import { Layout } from "@shared"
/*
import { classWithModifiers } from "@utils/common"
import { getPagesLinksDocuments } from "api/actions/pages"
import ClientAPI from "api/client"
import useDirectLogin from "hooks/useDirectLogin"
import ReactJSONEditorContainer from "i18n/react-json-editor-thirdParty"
import i18next from "i18next"
import { PageLinkType } from "interfaces/types"
import { UserType } from "interfaces/user"
import { ModalContainer } from "modules/modal/container"
import { Modal } from "modules/modal/controller"
import { StrictMode, Suspense, useRef, useState } from "react"
import { ClientContextProvider, useQuery } from "react-fetching-library"
import { I18nextProvider, useTranslation } from "react-i18next"
import { DefaultRootState, Provider,useSelector } from "react-redux"
import { Route, Routes } from "react-router"

import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import store from "redux/store"

import AppInit from "./AppInit"
import AdminEditableValue from "./components/admin/AdminEditableValue"
import Button from "./components/common/Button/Button"
import PopupForm from "./components/popups/PopupForm"
import ErrorBoundary from "./components/services/ErrorBoundary"
import OuterLink from "./components/services/OuterLink"
import Header from "./components/UI/Header/Header"
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
*/
import { BrowserRouter } from "react-router-dom"

function App() {
  if (process.env.NODE_ENV === "development") console.clear()

  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <Suspense fallback="">
              <ErrorBoundary fallback="Error">
                <AppInit />

                <Layout>
                  <Router />
                </Layout>

                <Cookies />
                <ModalContainer />
                <ToastContainer />

              </ErrorBoundary>
            </Suspense>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

function Main() {
  useDirectLogin()
  return (
    <main>

    </main>
  )
}

/*
function AdminViews() {
  const user = useSelector<DefaultRootState, DefaultRootState["user"]>(state => state.user)
  if (!user.auth || user.type < UserType.admin) return null
  return (
    <Routes>
      <Route path="/mentors" element={<AdminMentorsView />} />
      <Route path="/new-mentor" element={<AdminNewMentorView />} />
      <Route path="/edit-mentor/:mentorId" element={<AdminEditMentorView />} />
      <Route path="/topics" element={<AdminTopicsView />} />
      <Route path="/tags" element={<AdminTagsView />} />
      <Route path="/mailings" element={<AdminMailings />} />
      <Route path="/forms" element={<AdminFormsView />} />
    </Routes>
  )
}
*/

function Footer() {
  const { t } = useTranslation("translation", { keyPrefix: "footer" })
  const { payload } = useQuery(getPagesLinksDocuments)

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
