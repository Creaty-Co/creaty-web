import "./HowItWorks.scss"

import Button from "app/components/common/Button/Button"
import BulletPoint from "app/components/UI/BulletPoint/BulletPoint"
import InfoSection from "app/components/UI/InfoSection/InfoSection"
import useLocalization from "modules/localization/hook"


function HowItWorks() {
  const ll = useLocalization(ll => ll.views.home.howItWorks)
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title heading">{ll.title}</h2>
      <div className="how-it-works__points">
        {ll.points.map((point, index) => (
          <BulletPoint number={index + 1} {...point} key={index} />
        ))}
      </div>
      <div className="how-it-works__help">
        <InfoSection type="1" display="flex" {...ll.help}>
          <Button size="big" color="green">{ll.button}</Button>
        </InfoSection>
      </div>
    </div >
  )
}


export default HowItWorks
