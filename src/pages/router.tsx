import { Route, Routes } from "react-router"

export const Router = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path=":shortcut" element={<Home />} />
      <Route path="mentors" element={<Mentors />} />
      <Route path="mentors/:topicOrTag" element={<MentorsTopicOrTag />} />
      <Route path="user/:slug" element={<UserUserId />} />
      {/* <Route path="admin/*" element={<Admins />} /> */}
    </Route>
    <Route path="/*" element={<Error />} />
  </Routes>
)
