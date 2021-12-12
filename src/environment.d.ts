declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // React App
      REACT_APP_BASE_URL: string
    }
  }
}

export { }
