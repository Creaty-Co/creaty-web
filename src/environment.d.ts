declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // React App
      REACT_APP_BASE_URL: string
    }
  }
}


// Declare default language and explicit type
import __langJSON__ from "app/assets/lang/en.json"
type __langJSONType__ = typeof __langJSON__

declare module "plugins/react-plugin-localization" {
  interface LocalizationJSONRaw extends __langJSONType__ { }
}

export { }
