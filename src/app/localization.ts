// Langs
import ENLangJSON from "app/assets/lang/en.json"
import RULangJSON from "app/assets/lang/ru.json"
// Controller
import Localization from "plugins/react-plugin-localization/controller"

// Add languages
Localization.add("en", ENLangJSON)
Localization.add("ru", RULangJSON)
// Set default language
Localization.setDefault("en")

// Declare explicit language type
type DefaultLang = typeof ENLangJSON
declare module "plugins/react-plugin-localization" {
  interface LocalizationJSONRaw extends DefaultLang { }
}
