import { Component, ErrorInfo, ReactNode } from "react"
import ReactGA from "react-ga4"

export interface IErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

export interface IErrorBoundaryState {
  errorInfo: ErrorInfo | null
  error: Error | null
  hasError: boolean
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    hasError: false,
    errorInfo: null,
    error: null,
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    if (error) return { hasError: true, errorInfo: null, error: error }

    return { hasError: false, errorInfo: null, error: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* --- Google Analytics --- */
    ReactGA.send({
      hitType: "exception",
      description: "An error ocurred",
      errorName: error.name,
      errorMessage: error.message,
    })

    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
