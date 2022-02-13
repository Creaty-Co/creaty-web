import { Component, ErrorInfo, ReactNode } from "react"
import ReactGA from "react-ga"

interface ErrorBoundaryProps {
  fallback: ReactNode
}
interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
    errorInfo: null
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* --- Google Analytics --- */
    ReactGA.exception({
      description: "An error ocurred",
      errorName: error.name,
      errorMessage: error.message,
      fatal: true
    })
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.error) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
