import Icon from "app/components/common/Icon/Icon"
import { PopupAdminEditTag, PopupAdminNewTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import { PopupAdminEditTopic, PopupAdminNewTopic } from "app/components/popups/PopupAdmin/PopupAdminTopic"
import TopicTag from "app/components/UI/Tag/TopicTag"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { TopicType } from "interfaces/types"
import { Modal } from "modules/modal/controller"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils/common"


function AdminTopicsView() {
  const topics = useSelector(state => state.topics)
  const [currentTopic, setCurrentTopic] = useState<TopicType | null>(null)
  useEffect(() => {
    setCurrentTopic(topics.list.find(topic => topic.id === currentTopic?.id) || null)
  }, [topics])
  return (
    <AdminViewLayout>
      <AdminGroupLayout title="Категории">
        <div style={{ display: "flex" }}>
          <div className="mentor-search-list__container">
            {topics.list.map((topic, index) => (
              <button className={classWithModifiers("mentor-search-list__item", topic.id === (currentTopic?.id || 0) && "active")} type="button" onClick={() => setCurrentTopic(topic)} key={index}>
                <Icon href={topic.icon} />
                <span>{topic.title}</span>
              </button>
            ))}
            <button className="mentor-search-list__item" onClick={() => Modal.open(PopupAdminNewTopic)}>Добавить новую категорию</button>
          </div>
          <div className="mentor-search-list__tags">
            {currentTopic && (
              <button className="mentor-search-list__item" type="button" onClick={() => Modal.open(PopupAdminEditTopic, { topic: currentTopic })}>
                Редактировать категорию
              </button>
            )}
            {currentTopic?.tags.map(tag => (
              <button className="topic-tag" type="button" onClick={() => Modal.open(PopupAdminEditTag, { tag })} key={tag.id}>
                <span className="topic-tag__text">{tag.title}</span>
              </button>
            ))}
            {currentTopic && (
              <TopicTag noHash onClick={() => Modal.open(PopupAdminNewTag, { topicId: currentTopic.id })}>+</TopicTag>
            )}
            {!currentTopic && (
              <div className="mentor-search-list-empty">
                <Icon className="mentor-search-list-empty__icon" name="touch" />
                <span className="mentor-search-list-empty__text">Выберите категорию</span>
              </div>
            )}
          </div>
        </div>
      </AdminGroupLayout>
    </AdminViewLayout>
  )
}


export default AdminTopicsView
