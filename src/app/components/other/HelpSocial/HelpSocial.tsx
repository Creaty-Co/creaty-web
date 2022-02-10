import "./HelpSocial.scss"

import useLocalization from "modules/localization/hook"


function HelpSocial() {
  const ll = useLocalization(ll => ll.components.helpSocial)
  return (
    <div className="help-social">
      <div className="help-social__text">{ll.text}</div>
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
