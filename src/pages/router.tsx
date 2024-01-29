import { useAppSelector } from "@app/store"
import { authStartedS } from "@features/auth/auth.slice"
import AdminJSONEditorContainer from "@i18n/AdminJSONEditorContainer"
import { Spin } from "antd"
import { Route, Routes } from "react-router"

import { Home } from "./Home/Home"
import { Mentor } from "./Mentor/Mentor"
import { Mentors } from "./Mentors"

export enum EModalsRoutes {
  LOGIN = "login",
  SIGN_UP = "sign-up",
  RESET_PASSWORD_CODE = "reset-password/:code",
  RESET_PASSWORD_MENTOR_SUCCESS = "reset-password-mentor-success",
  EMAIL_VERIFY_CODE = "email-verify/:code",
  EMAIL_VERIFY_SUCCESS = "email-verify-success",
}

export const modalsRoutes = Object.values(EModalsRoutes)

export const Router = () => {
  const authIsLoading = useAppSelector(authStartedS)

  if (authIsLoading)
    return (
      <div
        style={{
          width: "min-content",
          height: "min-content",
          margin: "50px auto",
          padding: "50px",
          display: "grid",
          placeItems: "center",
          backgroundColor: "white",
          borderRadius: "50px",
        }}
      >
        <Spin size="large" />
      </div>
    )

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path=":shortcut" element={<Home />} />
        {modalsRoutes.map(route => (
          <Route key={route} path={route} element={<Home />} />
        ))}
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentor/:slug" element={<Mentor />} />
        <Route path="admin" element={<AdminJSONEditorContainer />} />
      </Route>
    </Routes>
  )
}
