"use client"

import { useRef, useEffect } from "react"

export const useAutoScroll = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = ref.current
    if (!scrollElement) return

    const handleScroll = () => {
      const firstChild = scrollElement.firstElementChild as HTMLElement
      if (!firstChild) return

      const itemWidth = firstChild.offsetWidth

      if (scrollElement.scrollLeft >= itemWidth) {
        scrollElement.scrollLeft -= itemWidth
      } else if (scrollElement.scrollLeft <= 0) {
        scrollElement.scrollLeft += itemWidth
      }
    }

    const scroll = () => {
      scrollElement.scrollBy({
        left: 1.5,
        behavior: "auto",
      })
    }

    scrollElement.addEventListener("scroll", handleScroll)
    const intervalId = setInterval(scroll, 20)

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll)
      clearInterval(intervalId)
    }
  }, [])

  return { ref }
}

