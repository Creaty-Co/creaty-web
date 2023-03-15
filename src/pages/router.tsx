// import { Error, Home, Mentor, Mentors } from "@pages"
import { Route, Routes } from "react-router"

import { Home } from "./home"
import { Mentors } from "./mentors"
import { User } from "./user"

export const Router = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      {/* <Route path=":shortcut" element={<Home/>} /> */}
      <Route path="mentors" element={<Mentors/>} />
      <Route path="mentors/:topicOrTag" element={<Mentors/>} />
      {/* <Route path="mentor/:slug" element={<Mentor/>} /> */}
      <Route path="user/:slug" element={<User/>} />
      {/* <Route path="admin/*" element={<Admins />} /> */}
    </Route>
    {/* <Route path="/*" element={<Error />} /> */}
  </Routes>
)
