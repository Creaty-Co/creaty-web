import "./HomeView.scss"

import MentorSearch from "app/components/other/MentorSearch/MentorSearch"
import MentorsSlider from "app/components/other/MentorsSlider/MentorsSlider"
import BigComment from "app/components/UI/BigComment/BigComment"
import useLocalization from "modules/localization/hook"

function HomeView() {
  const ll = useLocalization(ll => ll.views.home)
  return (
    <div className="home-view">
      <div className="home-view__header">
        <DynamicPrimaryInfo />
        <MentorSearch />
      </div>
      <div className="home-view__comment">
        <BigComment>{ll.bigComment}</BigComment>
      </div>
      <div className="home-view__slider">
        <MentorsSlider />
      </div>
    </div>
  )
}


function DynamicPrimaryInfo() {
  const ll = useLocalization(ll => ll.views.home.primaryInfo)
  return (
    <div className="dynamic-primary-info">
      <h1 className="dynamic-primary-info__title">
        <em>UX дизайн</em>
        <span>{ll.title}</span>
      </h1>
      <h2 className="dynamic-primary-info__desc">{ll.desc}</h2>
    </div>
  )
}


export default HomeView
