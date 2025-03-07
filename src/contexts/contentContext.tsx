"use client"

import type React from "react"
import { createContext } from "react"
import content from "../config/content.json"

export const ContentContext = createContext(content)

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

