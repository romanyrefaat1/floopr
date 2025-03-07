"use client"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/useContent"
import { useContext } from "react"
import { ModalContext } from "@/contexts/modalContext"
import EarlyAdoptersModal from "@/components/EarlyAdoptersModal"
import EmailForm from "./EmailForm"

export default function FocusSection() {
  const { focus } = useContent()
  const { changeModal } = useContext(ModalContext)

  const handleJoinClick = () => {
    changeModal(<EarlyAdoptersModal />)
  }

  return (
    <section className="bg-background py-14" id="join-us">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-text mb-4 relative">
            {focus.title}
            <span className="text-secondary select-none text-[25px] absolute -top-5 -right-0 transform rotate-[20deg]">
              {focus.emoji}
            </span>
          </h2>
          <p className="text-text-muted mb-8">{focus.subtitle}</p>
          <EmailForm />
        </motion.div>
      </div>
    </section>
  )
}

