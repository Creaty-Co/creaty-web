import { getMailings } from "api/actions/mailings"
import Button from "app/components/common/Button/Button"
import { PopupAdminEditMailing, PopupAdminNewMailing, PopupAdminXlSXMailing } from "app/components/popups/PopupAdmin/PopupAdminMailing"
import AdminGroupLayout from "app/layouts/AdminGroupLayout/AdminGroupLayout"
import AdminViewLayout from "app/layouts/AdminViewLayout/AdminViewLayout"
import { Modal } from "modules/modal/controller"
import { useState } from "react"
import { useQuery } from "react-fetching-library"


function AdminMailings() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const { error, loading, payload } = useQuery(getMailings(page, pageSize))
  if (error) throw new Error("useQuery error")
  return (
    <AdminViewLayout>

      <AdminGroupLayout title="Кнопки">
        <Button color="dark" onClick={() => Modal.open(PopupAdminNewMailing)}>Создать</Button>
        <Button color="dark" onClick={() => Modal.open(PopupAdminXlSXMailing)}>Подписчики</Button>
      </AdminGroupLayout>
      <AdminGroupLayout title="Рассылки">
        {payload?.results.map(mailing => (
          <div className="admin-view__entries admin-view__entries--flex" onClick={() => Modal.open(PopupAdminEditMailing, { mailing })} key={mailing.id}>
            <span>ID: {mailing.id}</span>
            <span>Рассылка: {mailing.is_done === null ? "Стоит" : (mailing.is_done ? "Идёт" : "Не идёт")}</span>
            <span>Тема: {mailing.subject}</span>
          </div>
        ))}
        <div>
          {page * pageSize < (payload?.count || 0) && (
            <>
              <Button color="dark" onClick={() => setPage(page - 1)}>Сюда</Button>
              <Button color="dark" onClick={() => setPage(page + 1)}>Туда</Button>
            </>
          )}
        </div>
      </AdminGroupLayout>
    </AdminViewLayout>
  )
}


export default AdminMailings
