import { useCallback, useEffect } from "react"

export function useToggleOverflow(open: boolean) {
  const toggleOverflow = useCallback((open: boolean) => {
    document.documentElement.style.overscrollBehavior = open ? "none" : ""
    document.body.style.overscrollBehavior = open ? "none" : ""
    document.documentElement.style.position = open ? "fixed" : ""
    document.body.style.position = open ? "fixed" : ""
    document.documentElement.style.overflow = open ? "hidden" : ""
    document.body.style.overflow = open ? "hidden" : ""
  }, [])

  useEffect(() => toggleOverflow(open), [open])
}
