import { Formus } from "@shared/ui/Formus/Formus"
import { PopupLayout } from "@shared/ui/PopupLayout/PopupLayout"
import { bem } from "@shared/utils/common"
import { Button, Modal } from "antd"
import cn from "classnames"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const CN = "email-verify-success"
const { getElement } = bem(CN)

interface IProps {
  show: boolean
}

export const ResetPasswordMentorSuccessModal = memo(function ResetPasswordMentorSuccessModal({ show }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.resetPasswordMentorSuccess" })
  const navigate = useNavigate()

  const handleClose = () => navigate("/")

  const elementContent = <span className={getElement("footer")}>{t("tip")}</span>

  const elementControl = (
    <Button className={cn("button button--green button--biggest", getElement("button"))} htmlType="submit">
      {t("submitText")}
    </Button>
  )

  return (
    <Modal
      open={show}
      footer={null}
      closable={false}
      maskClosable={false}
      keyboard={false}
    >
      <PopupLayout
        title={<h3 className={cn("font--h3-bold popup-layout__title", getElement("title"))}>{t("title")}</h3>}
        subTitle={<h4 className="font--h4-bold">{t("header")}</h4>}
        shadow
        black
        hideCross
      >
        <Formus elementControl={elementControl} elementContent={elementContent} onSubmit={handleClose} />
      </PopupLayout>
    </Modal>
  )
})
