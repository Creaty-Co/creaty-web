import { getMailings } from "api/actions/mailings"
import Button from "app/components/common/Button/Button"
import { PopupAdminEditMailing, PopupAdminNewMailing } from "app/components/popups/PopupAdmin/PopupAdminMailing"
import { Popup } from "modules/popup/controller"
import { useState } from "react"
import { useQuery } from "react-fetching-library"


function AdminMailings() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const { error, loading, payload } = useQuery(getMailings(page, pageSize))
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>
  return (
    <div className="admin-view">
      <h2 className="admin-view__title">Рассылки</h2>
      <Button color="dark" onClick={() => Popup.open(PopupAdminNewMailing)}>Создать</Button>
      <div className="admin-view__entries admin-view__entries--grid" style={{ cursor: "pointer" }}>
        {payload.results.map(mailing => (
          <div className="admin-view__entries admin-view__entries--flex" onClick={() => Popup.open(PopupAdminEditMailing, { mailing })} key={mailing.id}>
            <span>ID: {mailing.id}</span>
            <span>Рассылка: {mailing.is_done === null ? "Стоит" : (mailing.is_done ? "Идёт" : "Не идёт")}</span>
            <span>Тема: {mailing.subject}</span>
          </div>
        ))}
      </div>
      <div>
        {page * pageSize < payload.count && (
          <>
            <Button color="dark" onClick={() => setPage(page - 1)}>Сюда</Button>
            <Button color="dark" onClick={() => setPage(page + 1)}>Туда</Button>
          </>
        )}
      </div>
    </div>
  )
}


export default AdminMailings
