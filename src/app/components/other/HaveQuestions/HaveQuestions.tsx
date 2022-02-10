import "./HaveQuestions.scss"

import useLocalization from "modules/localization/hook"

import ContactForm from "../ContactForm/ContactForm"


function HaveQuestions() {
  const ll = useLocalization(ll => ll.components.haveQuestions)
  return (
    <div className="have-questions">
      <div className="have-questions__info">
        <h2 className="have-questions__title heading">{ll.title}</h2>
        <p className="have-questions__desc">{ll.desc}</p>
      </div>
      <div className="have-questions__form">
        <ContactForm type="still_questions" />
      </div>
    </div>
  )
}


export default HaveQuestions
