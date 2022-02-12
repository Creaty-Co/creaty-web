import Icon from "app/components/common/Icon/Icon"
import { PopupAdminEditTag, PopupAdminNewTag } from "app/components/popups/PopupAdmin/PopupAdminTag"
import { PopupAdminEditTopic, PopupAdminNewTopic } from "app/components/popups/PopupAdmin/PopupAdminTopic"
import TopicTag from "app/components/UI/Tag/TopicTag"
import { TopicType } from "interfaces/types"
import { Popup } from "modules/popup/controller"
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
    <div className="admin-view">
      <h2 className="admin-view__title">Категории</h2>
      <div className={classWithModifiers("mentor-search-list", "visible")}>
        <div className="mentor-search-list__container">
          {topics.list.map((topic, index) => (
            <button className={classWithModifiers("mentor-search-list__item", topic.id === (currentTopic?.id || 0) && "active")} type="button" onClick={() => setCurrentTopic(topic)} key={index}>
              <Icon href={topic.icon} />
              <span>{topic.title}</span>
            </button>
          ))}
          <button className="mentor-search-list__item" onClick={() => Popup.open(PopupAdminNewTopic)}>Добавить новую категорию</button>
        </div>
        <div className="mentor-search-list__tags">
          {currentTopic && (
            <button className="mentor-search-list__item" type="button" onClick={() => Popup.open(PopupAdminEditTopic, { topic: currentTopic })}>
              Редактировать категорию
            </button>
          )}
          {currentTopic?.tags.map(tag => (
            <button className="topic-tag" type="button" onClick={() => Popup.open(PopupAdminEditTag, { tag })} key={tag.id}>
              <span className="topic-tag__text">{tag.title}</span>
            </button>
          ))}
          {currentTopic && (
            <TopicTag noHash onClick={() => Popup.open(PopupAdminNewTag, { topicId: currentTopic.id })}>+</TopicTag>
          )}
          {!currentTopic && (
            <div className="mentor-search-list-empty">
              <Icon className="mentor-search-list-empty__icon" name="touch" />
              <span className="mentor-search-list-empty__text">Выберите категорию</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default AdminTopicsView
