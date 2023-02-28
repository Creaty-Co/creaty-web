import "./error.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"

interface ErrorViewProps {
  error?: Error
  errorCode?: string | number
}

function ErrorView({
  error,
  errorCode = "404"
} : ErrorViewProps) {
  const msg = error? error.message : "Ooops, something goes wrong..."
  const code = error
    ? errorCode !== "404"? errorCode : error.name
    : "404"
  
  return (
    <div className="error-view">
      <div className="error-view__container">
        <div className="error-view__info">
          <h2 className="heading error-view__title">{msg}</h2>
          <ButtonLink size="big" color="white" to="/">Back to main</ButtonLink>
        </div>
        <div className="error-view__code">{ code }</div>
      </div>
    </div>
  )
}

export default ErrorView
