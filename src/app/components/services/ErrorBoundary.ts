import { Component, ErrorInfo } from "react"


interface ErrorBoundaryProps {
  fallback: any
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
