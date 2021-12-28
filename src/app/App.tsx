// Implement plugins configs
import "plugins-config"

import Localization from "plugins/localization/controller"
import useLocalization from "plugins/localization/hook"

function App() {
  const ll = useLocalization(ll => ll)
  return (
    <>
      <button onClick={() => Localization.transit("ru")}>To russian</button>
      <button onClick={() => Localization.transit("en")}>To english</button>
      {ll?.lang}
    </>
  )
}

export default App
