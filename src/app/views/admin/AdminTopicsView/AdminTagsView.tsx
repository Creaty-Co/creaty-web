import { PopupAdminEditTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import TopicTag from "app/components/UI/Tag/TopicTag"
import { Popup } from "modules/popup/controller"
import { useSelector } from "react-redux"


function AdminTagsView() {
  const topics = useSelector(state => state.topics)
  return (
    <div className="admin-view">
      <h2 className="admin-view__title">Тэги</h2>
      <div className="admin-view__entries admin-view__entries--flex">
        {topics.tags.map(tag => (
          <TopicTag {...tag} key={tag.id} onClick={() => Popup.open(PopupAdminEditTag, { tag })}>{tag.title}</TopicTag>
        ))}
      </div>
    </div>
  )
}


export default AdminTagsView
