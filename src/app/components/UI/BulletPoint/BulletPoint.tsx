import "./BulletPoint.scss"


interface BulletPointProps {
  number: string | number
  title: string
  desc: string
}

function BulletPoint(props: BulletPointProps) {
  return (
    <div className="bullet-point">
      <div className="bullet-point__circle">
        <div className="bullet-point__number">{props.number}</div>
      </div>
      <div className="bullet-point__container">
        <div className="bullet-point__title">{props.title}</div>
        <div className="bullet-point__desc">{props.desc}</div>
      </div>
    </div>
  )
}


export default BulletPoint
