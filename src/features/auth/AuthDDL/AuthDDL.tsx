import "./authDDL.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { selectAuthUsersData } from "@features/users/users.slice"
import { bem } from "@shared/utils"
import { Avatar, Dropdown, MenuProps } from "antd"
import { useMemo } from "react"

const CN = "auth-ddl"
const { getElement } = bem(CN)

export function AuthDDL() {
  const authUsersData = useAppSelector(selectAuthUsersData)
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
    // if (key === "user") message.info("user profile will be developed soon")
    if (key === "user") return
    if (key === "logOut") dispatch({ type: "auth/logOut" })
  }

  return (
    <Dropdown menu={{ items, onClick }} placement="bottomRight" overlayClassName={getElement("ddl")}>
      <Avatar
        size={48}
        shape="square"
        icon={<img src="/static/icons/user-avatar.svg" alt="user-avatar" className={getElement("avatar")} />}
      />
    </Dropdown>
  )
}
