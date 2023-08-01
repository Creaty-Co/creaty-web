import "./authDDL.scss"

import { history } from "@app/App"
import { useAppDispatch, useAppSelector } from "@app/store"
import { bem } from "@shared/utils"
import { Avatar, Badge, Dropdown, MenuProps } from "antd"
import { useMemo } from "react"

import { authUserDataS, resetAuthState } from "../../../features/auth/auth.slice"

const CN = "auth-ddl"
const { getElement } = bem(CN)

export function AuthDDL() {
  const authUsersData = useAppSelector(authUserDataS)
  const dispatch = useAppDispatch()

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "user",
        label: (
          <>
            Signed in as <br /> <b> {authUsersData.email}</b>
          </>
        ),
      },
      { type: "divider" },
      {
        key: "logOut",
        label: "Sign out",
      },
    ],
    [authUsersData]
  )
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "user") return
    if (key === "logOut") {
      dispatch(resetAuthState())
      history.push("/")
    }
  }
  const avatar = (
    <Avatar
      size={48}
      shape="square"
      icon={<img src="/static/icons/user-avatar.svg" alt="user-avatar" className={getElement("avatar")} />}
    />
  )
  return (
    <Dropdown
      menu={{ items, onClick }}
      placement="bottomRight"
      overlayClassName={getElement("ddl")}
      trigger={["click"]}
    >
      {authUsersData.isMentor ? (
        <Badge count={<img src="/static/icons/mentor-badge.svg" alt="user-avatar" className={getElement("badge")} />}>
          {avatar}
        </Badge>
      ) : (
        avatar
      )}
    </Dropdown>
  )
}
