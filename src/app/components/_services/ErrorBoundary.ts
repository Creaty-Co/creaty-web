import { Component, ErrorInfo, ReactNode } from "react"
import ReactGA from "react-ga4"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}
interface ErrorBoundaryState {
  errorInfo: ErrorInfo | null
  error: Error | null
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state : ErrorBoundaryState = {
    hasError: false,
    errorInfo: null,
    error: null
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error) return { hasError: true, errorInfo: null, error: error }

    return { hasError: false, errorInfo: null, error: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* --- Google Analytics --- */
    ReactGA.send({
      hitType: "exception",
      description: "An error ocurred",
      errorName: error.name,
      errorMessage: error.message
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

export default ErrorBoundary
