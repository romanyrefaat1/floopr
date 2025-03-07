"use client"

import { createContext, useState, type ReactNode } from "react"

interface ModalContextType {
  isModal: boolean
  modal: ReactNode | null
  changeModal: (modal: ReactNode) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
  isModal: false,
  modal: null,
  changeModal: () => {},
  closeModal: () => {},
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModal, setIsModal] = useState(false)
  const [modal, setModal] = useState<ReactNode | null>(null)

  const changeModal = (modal: ReactNode) => {
    setModal(modal)
    setIsModal(true)
  }

  const closeModal = () => {
    setIsModal(false)
    setModal(null)
  }

  return (
    <ModalContext.Provider value={{ isModal, modal, changeModal, closeModal }}>
      {children}
      {isModal && modal}
    </ModalContext.Provider>
  )
}

