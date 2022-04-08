import "./ErrorView.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"

function ErrorView() {
  return (
    <div className="error-view">
      <div className="error-view__container">
        <div className="error-view__info">
          <h2 className="heading error-view__title">Ooops, something goes wrong...</h2>
          <ButtonLink size="big" color="white" to="/">Back to main</ButtonLink>
        </div>
        <div className="error-view__code">404</div>
      </div>
    </div>
  )
}

export default ErrorView
