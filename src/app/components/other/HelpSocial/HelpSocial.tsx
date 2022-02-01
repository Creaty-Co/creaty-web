import "./HelpSocial.scss"


function HelpSocial() {
  return (
    <div className="help-social">
      <div className="help-social__text">Задавайте вопросы там, {"\n где удобнее"}</div>
      <div className="help-social__splitter" />
      <a href="#">
        <img src="/static/icons/telegram.svg" alt="telegram" className="help-social__icon" />
      </a>
      <a href="#">
        <img src="/static/icons/messenger.svg" alt="telegram" className="help-social__icon" />
      </a>
      <a href="#">
        <img src="/static/icons/whatsapp.svg" alt="telegram" className="help-social__icon" />
      </a>
    </div>
  )
}


export default HelpSocial
