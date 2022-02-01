import "./HelpfulCreaty.scss"

import ButtonLink from "app/components/common/Button/ButtonLink"
import useLocalization from "modules/localization/hook"


function HelpfulCreaty() {
  const ll = useLocalization(ll => ll.components.helpfulCreaty)
  return (
    <div className="helpful-creaty">
      <div className="helpful-creaty__group">
        <h2 className="helpful-creaty__title heading">{ll.title}</h2>
        <HelpfulCreatyBlock {...ll.blocks[0]} flag="yellow" />
        <HelpfulCreatyBlock {...ll.blocks[1]} flag="purple" />
      </div>

      <div className="helpful-creaty__group">
        <HelpfulCreatyBlock {...ll.blocks[2]} flag="orange" />
        <HelpfulCreatyBlock {...ll.blocks[3]} flag="blue" />
        <ButtonLink className="helpful-creaty__button" to="/help" style="outline" color="green">{ll.button}</ButtonLink>
      </div>
    </div>
  )
}


interface HelpfulCreatyBlockProps {
  title: string
  flag: "yellow" | "orange" | "blue" | "purple"
  points: string[]
}

function HelpfulCreatyBlock(props: HelpfulCreatyBlockProps) {
  return (
    <div className="helpful-creaty-block" >
      <div className="helpful-creaty-block__header">
        <div className="helpful-creaty-block__title">{props.title}</div>
        <div className="helpful-creaty-block__circle">
          <img src={`/static/icons/flags/flag-${props.flag}.svg`} alt={props.flag + " flag"} className="helpful-creaty-block__flag" />
        </div>
      </div>
      <div className="helpful-creaty-block__content">
        <ul>
          {props.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default HelpfulCreaty