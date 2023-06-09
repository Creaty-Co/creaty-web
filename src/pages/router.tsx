import { Route, Routes } from "react-router"

import { Home } from "./Home/Home"
import { Mentor } from "./Mentor/Mentor"
import { Mentors } from "./mentors"

export const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="reset-password/:code" element={<Home />} />
        <Route path="email-verify/:code" element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentors/:topicOrTag" element={<Mentors />} />
        <Route path="mentor/:slug" element={<Mentor />} />
      </Route>
    </Routes>
  )
}
