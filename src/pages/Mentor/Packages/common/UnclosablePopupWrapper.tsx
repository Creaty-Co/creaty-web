import { SharedButtonIcon } from "@shared/ui/buttons/SharedButtonIcon"
import { bem } from "@shared/utils/common"
import { Modal, Popconfirm } from "antd"
import { memo, ReactNode, useState } from "react"

const CN = "popup-layout"
const { getElement } = bem(CN)

interface IProps {
  open: boolean
  title?: string
  mentorName?: string
  children: ReactNode
  closeModal(): void
}

export const UnclosablePopupWrapper = memo(function UnclosablePopupWrapper({
  open,
  title,
  mentorName,
  children,
  closeModal,
}: IProps) {
  const [openPopconfirm, setOpenPopconfirm] = useState(false)
  const handleOpenPopconfirm = () => setOpenPopconfirm(true)
  const handleClosePopconfirm = () => setOpenPopconfirm(false)
  const handleCloseModal = () => {
    setOpenPopconfirm(false)
    closeModal()
  }

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      forceRender
      onCancel={handleOpenPopconfirm}
      style={{ top: window.innerWidth <= 600 ? 16 : undefined }}
    >
      <div className={CN}>
        <Popconfirm
          title="Are you sure you want to stop the booking?"
          onConfirm={handleCloseModal}
          onCancel={handleClosePopconfirm}
          okText="Yes"
          cancelText="No"
          placement="bottom"
          open={openPopconfirm}
          okButtonProps={{ type: "primary" }}
        >
          <div className={getElement("close")}>
            <SharedButtonIcon name="cross" size="small" color="white" outline onClick={handleOpenPopconfirm} />
          </div>
        </Popconfirm>

        <h3 className="font--h3-bold popup-layout__title">
          {title}
          <em>{mentorName}</em>
        </h3>

        <div className={getElement("container")}>{children}</div>
      </div>
    </Modal>
  )
})
