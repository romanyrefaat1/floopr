"use client"

import type React from "react"
import { useEffect } from "react"

interface MetaProps {
  description: string
}

const DynamicMeta: React.FC<MetaProps> = ({ description }) => {
  useEffect(() => {
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[name="description"]')

    if (metaTag) {
      // Update the existing meta tag
      metaTag.setAttribute("content", description)
    } else {
      // Create a new meta tag
      const newMetaTag: HTMLMetaElement = document.createElement("meta")
      newMetaTag.name = "description"
      newMetaTag.content = description
      document.head.appendChild(newMetaTag)
    }
  }, [description])

  return null // No UI output
}

export default DynamicMeta

