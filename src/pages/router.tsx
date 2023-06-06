import { Route, Routes } from "react-router"

import { Home } from "./home"
import { Mentors } from "./mentors"
import { User } from "./user"

export const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="reset-password/:code" element={<Home />} />
        <Route path="email-verify/:code" element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentors/:topicOrTag" element={<Mentors />} />
        <Route path="user/:slug" element={<User />} />
      </Route>
    </Routes>
  )
}
