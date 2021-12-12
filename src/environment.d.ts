declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PWD: string
      // React App
      REACT_APP_BASE_URL: string
    }
  }
}

export { }
