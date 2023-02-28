import "./help-social.scss"

import { getPagesLinksSocials } from "api/actions/pages"
import AdminInterface from "app/components/admin/AdminInterface"
import Button from "app/components/common/Button/Button"
import { PopupAdminEditSocial, PopupAdminNewSocial } from "app/components/popups/PopupAdmin/PopupAdminSocial"
import OuterLink from "app/components/services/OuterLink"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import { Modal } from "modules/modal/controller"
import { useQuery } from "react-fetching-library"
import { useTranslation } from "react-i18next"


function HelpSocial() {
  const { t } = useTranslation("translation", { keyPrefix: "components.helpSocial" })
  const { error, loading, payload } = useQuery(getPagesLinksSocials)
  if (error) return <>useQuery error</>
  if (loading) return <LoaderCover white />
  if (!payload) return <>no content</>
  return (
    <div className="help-social">
      <div className="help-social__text">{t("text")}</div>
      <div className="help-social__splitter" />
      {payload.results.map(img => (
        <div key={img.id}>
          <OuterLink to={img.url} eventLabel="social network">
            <img src={img.icon} alt="social network" className="help-social__icon" />
          </OuterLink>
          <AdminInterface>
            <Button onClick={() => Modal.open(PopupAdminEditSocial, { img })}>Ред.</Button>
          </AdminInterface>
        </div>
      ))}
      <AdminInterface>
        <Button onClick={() => Modal.open(PopupAdminNewSocial)}>Добавить ссылку</Button>
      </AdminInterface>
      {/* <OuterLink>
        <img src="/static/icons/messenger.svg" alt="telegram" className="help-social__icon" />
      </OuterLink>
      <OuterLink href="#">
        <img src="/static/icons/whatsapp.svg" alt="telegram" className="help-social__icon" />
      </OuterLink> */}
    </div>
  )
}


export default HelpSocial
