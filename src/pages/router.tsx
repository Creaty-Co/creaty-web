import { useAppSelector } from "@app/store"
import { selectIsAuth, selectIsAuthLoading } from "@features/users/users.slice"
import AdminJSONEditorContainer from "@i18n/AdminJSONEditorContainer"
import { Spin } from "antd"
import { Route, Routes } from "react-router"

import { Home } from "./Home/Home"
import { Mentor } from "./Mentor/Mentor"
import { Mentors } from "./mentors"

export const Router = () => {
  const isAuthLoading = useAppSelector(selectIsAuthLoading)
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuthLoading && isAuth === null)
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
        <Route path="reset-password/:code" element={<Home />} />
        <Route path="email-verify/:code" element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentors/:topicOrTag" element={<Mentors />} />
        <Route path="mentor/:slug" element={<Mentor />} />
        <Route path="admin" element={<AdminJSONEditorContainer />} />
      </Route>
    </Routes>
  )
}
