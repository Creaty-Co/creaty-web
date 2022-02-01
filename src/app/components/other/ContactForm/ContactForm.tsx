import "./ContactForm.scss"

import Button from "app/components/common/Button/Button"
import Input from "app/components/UI/Input/Input"


function ContactForm() {
  return (
    <form className="contact-form">
      <div className="contact-form__inputs">
        <Input placeholder="Имя" required />
        <Input placeholder="Email" required />
        <Input placeholder="Номер или ник в " required masks={[{ title: "Telegram", mask: "" }, { title: "WhatsApp", mask: "" }, { title: "Messanger", mask: "" }, { title: "Viber", mask: "" }]} />
      </div>
      <Button className="contact-form__submit" size="big" type="submit" color="dark">Отправить</Button>
      <div className="contact-form__terms">Нажав на кнопку, я соглашаюсь на обработку персональных данных в соответсвии с политикой конфиденциальности</div>
    </form>
  )
}


export default ContactForm
