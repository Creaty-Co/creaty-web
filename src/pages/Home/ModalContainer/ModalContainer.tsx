import { useToggleOverflow } from "@shared/hooks/useToggleOverflow"
import { closeModal, selectModalContainerActive, selectModalContainerContent } from "@store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "@store/store"
import { Modal } from "antd"

// TODO: finish migration to ant d modal. Delete file after
export function ModalContainer() {
  const dispatch = useAppDispatch()

  const elementContent = useAppSelector(selectModalContainerContent())
  const isActive = useAppSelector(selectModalContainerActive())

  useToggleOverflow(isActive)

  return (
    <Modal
      open={isActive}
      onCancel={() => dispatch(closeModal())}
      footer={null}
      closable={false}
      focusTriggerAfterClose={false}
      style={{ top: window.innerWidth <= 600 ? 16 : undefined }}
    >
      {elementContent}
    </Modal>
  )
}
