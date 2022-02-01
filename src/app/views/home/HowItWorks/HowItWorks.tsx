import "./HowItWorks.scss"

import Button from "app/components/common/Button/Button"
import BulletPoint from "app/components/UI/BulletPoint/BulletPoint"
import InfoSection from "app/components/UI/InfoSection/InfoSection"


function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title heading">Как это работает</h2>
      <div className="how-it-works__points">
        <BulletPoint number="1" title={"Опишите ваши цели и \n задачи"} desc={"Oставьте <Link to=\"/become-mentor\">заявку</Link>, чтобы можно было связаться и обсудить какая именно помощь вам нужна."} />
        <BulletPoint number="2" title={"Выберите ментора, \n познакомьтесь"} desc="После выбора ментора, вы встретитесь на БЕСПЛАТНОЙ тестовой 15 минутной встрече, где сможете обсудить цели и план обучения." />
        <BulletPoint number="3" title="Совершенствуйтесь!" desc="И пусть тяга к новым достижениям и профессиональным высотам поможет вам преодолеть лень,  голод и любые невзгоды!" />
      </div>
      <div className="how-it-works__help">
        <InfoSection type="1" display="flex" title="Тестовая встреча <em>бесплатно!</em>" desc={"Чтобы познакомится, понять насколько вы друг другу \n подходите и договорится о плане и графике занятий"}>
          <Button size="big" color="green">Попробовать бесплатно</Button>
        </InfoSection>
      </div>
    </div >
  )
}


export default HowItWorks
