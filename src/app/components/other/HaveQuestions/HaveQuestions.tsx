import "./HaveQuestions.scss"

import ContactForm from "../ContactForm/ContactForm"


function HaveQuestions() {
  return (
    <div className="have-questions">
      <div className="have-questions__info">
        <h2 className="have-questions__title heading">Ещё остались вопросы?</h2>
        <p className="have-questions__desc">
          Если у вас есть вопросы о формате или вы не знаете какого ментора выбрать, просто оставьте свой номер и почту{":\n"}
          <em>мы свяжемся, чтобы ответить на все ваши вопросы</em>
        </p>
      </div>
      <div className="have-questions__form">
        <ContactForm type="still_questions" />
      </div>
    </div>
  )
}


export default HaveQuestions
