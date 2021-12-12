declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PWD: string
      // React App
      REACT_APP_BASE_URL: string
    }
  }
}


import __langJSON__ from "app/assets/lang/en.json"
type __langJSONType__ = typeof __langJSON__

declare module "plugins/react-plugin-localization" {
  interface LocalizationJSONRaw extends __langJSONType__ { }
}

export { }
