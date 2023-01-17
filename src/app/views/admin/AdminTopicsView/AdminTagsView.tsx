import { PopupAdminEditTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import TopicTag from "app/components/UI/Tag/TopicTag"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { Modal } from "modules/modal/controller"
import { DefaultRootState, useSelector } from "react-redux"


function AdminTagsView() {
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
  return (
    <AdminViewLayout>
      <AdminGroupLayout title="Тэги">
        <div className="admin-view__entries admin-view__entries--flex">
          {topics.tags.map(tag => (
            <TopicTag {...tag} key={tag.id} onClick={() => Modal.open(PopupAdminEditTag, { tag })}>{tag.title}</TopicTag>
          ))}
        </div>
      </AdminGroupLayout>
    </AdminViewLayout>
  )
}


export default AdminTagsView
