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

import { Dispatch, SetStateAction } from "react"

import { PopupContainerState } from "./container"
import { PopupComponent, PopupParams, PopupWindow } from "./interfaces"

type AnyIfEmpty<T extends object> = keyof T extends never ? any : T

const convertToBase64 = (data: any) => Buffer.from(JSON.stringify(data)).toString("base64")

export const PopupPrivate: {
  dispatch: Dispatch<SetStateAction<PopupContainerState>>
} = {
  dispatch: () => { throw new Error("PopupError: no containers were found") }
}

export class Popup {
  public static open<
    P extends object = {},
    AC extends Partial<PopupParams> & P = Partial<PopupParams> & P
  >(
    component: PopupComponent<P>,
    ...[params]: AnyIfEmpty<P> extends object ? [AC] : [AC?]
  ): Promise<void> {
    return new Promise<void>(function (resolve) {
      const popupWindow = { component, params, close }
      Popup.addToQueue(popupWindow)
      function close() {
        resolve()
        Popup.removeFromQueue(popupWindow)
      }
    })
  }
  private static addToQueue(popupWindow: PopupWindow<any>) {
    PopupPrivate.dispatch(state => {
      // Skip adding to queue if there is already the same window
      if (state.queue.length > 0) {
        const lastWindow = state.queue[state.queue.length - 1]
        if ((convertToBase64(lastWindow.params || {}) === convertToBase64(popupWindow.params || {})) && lastWindow.component === popupWindow.component) {
          return { ...state, isActive: true }
        }
      }
      // Set queue if popup was inactive and has only one window
      // to be sure that window by the rule above won't appear again
      if (state.isActive === false && state.queue.length === 1) {
        return {
          isActive: true,
          queue: [popupWindow]
        }
      }
      return {
        isActive: true,
        queue: [...state.queue, popupWindow]
      }
    })
  }
  private static removeFromQueue(popupWindow: PopupWindow<any>) {
    PopupPrivate.dispatch(state => {
      const queue = state.queue.filter(pw => pw !== popupWindow)
      // Hide modal without removing if it's the last window
      if (queue.length === 0) {
        return { isActive: false, queue: [popupWindow] }
      }
      return { ...state, queue }
    })
  }
  public static closeAll() {
    PopupPrivate.dispatch(state => {
      state.queue.forEach(popup => popup.close())
      return {
        isActive: false,
        queue: []
      }
    })
  }
}
