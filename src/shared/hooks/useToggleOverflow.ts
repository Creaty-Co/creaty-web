import { useCallback, useEffect, useRef } from "react"

const DISABLE_SCROLLING_CLASS = "scroll-disabled"
// fix scroll body issue behind opened modal for ios
export function useToggleOverflow(open: boolean, shouldScroll = true) {
  const scrollPosition = useRef(0)

  const toggleOverflow = useCallback((open: boolean) => {
    const body = document.body
    if (open) {
      scrollPosition.current = window.scrollY
      body.classList.add(DISABLE_SCROLLING_CLASS)
      if (shouldScroll) body.style.top = `-${scrollPosition.current}px`
    } else {
      body.classList.remove(DISABLE_SCROLLING_CLASS)
      body.style.removeProperty("top")
      if (shouldScroll) window.scrollTo(0, scrollPosition.current)
    }
  }, [])

  useEffect(() => toggleOverflow(open), [open])
}
