import { useState, useEffect } from "react"
import Localization, { Localize, LocalizationJSON } from "./controller"

function useLocalization<Selected extends object = LocalizationJSON>(selector?: (trans: LocalizationJSON) => Selected): Partial<Selected> {
  const [localization, updateLocalization] = useState(Localize(selector))
  useEffect(() => {
    return Localization.onTransition(() => updateLocalization(Localize(selector)))
  }, [])
  return localization
}

export default useLocalization