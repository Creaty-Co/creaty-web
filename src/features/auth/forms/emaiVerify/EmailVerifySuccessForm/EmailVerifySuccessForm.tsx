import "./EmailVerifySuccessForm.scss"

import { PopupLayout } from "@shared/layout"
import { Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const CN = "email-verify-success"
const { getElement } = bem(CN)

interface IProps {
  isLoading?: boolean
}

export const EmailVerifySuccessForm = memo(function EmailVerifySuccessForm({ isLoading }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.emailVerifySuccess" })

  const navigate = useNavigate()
  const closeModal = () => navigate("/")

  const elementContent = (
    <>
      <span className={getElement("discount-description")}>{t("body")}</span>
      <span className={getElement("footer")}>{t("tip")}</span>
    </>
  )

  const elementControl = (
    <Button
      className={cn("button button--green button--biggest", getElement("button"))}
      htmlType="submit"
      loading={!!isLoading}
    >
      {t("submitText")}
    </Button>
  )

  return (
    <PopupLayout
      title={<h3 className={cn("font--h3-bold popup-layout__title", getElement("title"))}>{t("title")}</h3>}
      subTitle={<h4 className="font--h4-bold">{t("header")}</h4>}
      onClose={closeModal}
      hideCross
      shadow
      black
    >
      <Formus elementControl={elementControl} elementContent={elementContent} onSubmit={closeModal} />
    </PopupLayout>
  )
})
