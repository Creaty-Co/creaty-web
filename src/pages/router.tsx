import { Route, Routes } from "react-router"

const Router = () => (
  <Routes>
    <Route path="/">
      <Route index element={<HomeView />} />
      <Route path=":shortcut" element={<HomeView />} />
      <Route path="mentors" element={<MentorsView />} />
      <Route path="mentors/:topicOrTag" element={<MentorsViewTopicOrTag />} />
      <Route path="user/:slug" element={<UserUserId />} />
      {/* <Route path="admin/*" element={<AdminViews />} /> */}
    </Route>
    <Route path="/*" element={<ErrorView />} />
  </Routes>
)

export default Router