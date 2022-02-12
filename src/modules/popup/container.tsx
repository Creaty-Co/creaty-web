/*

MIT License

Copyright (c) 2022 Valery Zinchenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

*/

import { Component } from "react"
import { classWithModifiers } from "utils/common"

import { PopupContext } from "./context"
import { PopupPrivate } from "./controller"
import { PopupWindow } from "./interfaces"

export interface PopupContainerProps {
  className?: string
}
export interface PopupContainerState {
  isActive: boolean
  queue: PopupWindow[]
}

export class PopupContainer extends Component<PopupContainerProps, PopupContainerState> {
  state: PopupContainerState = {
    isActive: false,
    queue: []
  }

  constructor(props: any) {
    super(props)
    // Set Popup dispatcher
    PopupPrivate.dispatch = this.setState.bind(this)
  }

  render() {
    const { isActive, queue } = this.state
    const lastPopup = queue[queue.length - 1] as PopupWindow<{}> | undefined
    const { component: PopupWindowComponent, params = {}, close } = lastPopup || {}

    const className = this.props.className || "popup"
    return (
      <div className={classWithModifiers(className, isActive && "active")}>
        <div className={className + "__container"} onClick={close}>
          <div className={className + "__inner"} onClick={event => event.stopPropagation()}>
            <PopupContext.Provider value={lastPopup || null}>
              {PopupWindowComponent && <PopupWindowComponent {...params} />}
            </PopupContext.Provider>
          </div>
        </div>
      </div>
    )
  }
}
