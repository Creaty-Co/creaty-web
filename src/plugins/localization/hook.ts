/*

MIT License

Copyright (c) 2021 Code Pandora Dev

The full copy of LICENSE is in the root directory

*/

import { useEffect, useState } from "react"

import Localization, { LocalizationJSON, Localize } from "./controller"

function useLocalization<Selected extends Record<string, unknown> = LocalizationJSON>(selector: (ll?: LocalizationJSON) => Selected | undefined): Partial<Selected> | undefined {
  const [localization, updateLocalization] = useState(Localize(selector))
  useEffect(() => {
    return Localization.onTransition(() => updateLocalization(Localize(selector)))
  }, [])
  return localization
}

export default useLocalization
