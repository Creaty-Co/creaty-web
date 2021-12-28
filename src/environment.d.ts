declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // React App
      REACT_APP_API_HOST: string
      REACT_APP_API_CACHE: string
      REACT_APP_API_CACHE_TIME: string
    }
  }
}

export { }
