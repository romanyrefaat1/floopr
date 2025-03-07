"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/useContent"
import { useContext } from "react"
import { ModalContext } from "@/contexts/modalContext"
import EarlyAdoptersModal from "@/components/EarlyAdoptersModal"
import EmailForm from "./EmailForm"

export default function Hero() {
  const { hero } = useContent()
  const { changeModal } = useContext(ModalContext)
  const [email, setEmail] = useState<string>("")

  // const handleJoinClick = () => {
  //   changeModal(<EarlyAdoptersModal />)
  // }

  return (
    <div className="relative bg-primary flex items-center justify-center overflow-hidden min-h-[calc(100vh-60px)] py-12 pt-20">
      <div className="container mx-auto md:flex flex-col md:flex-row justify-center gap-12 items-center px-4 md:px-[16px] relative z-10">
        <div className="grid grid-cols-1 md:max-w-[85vw]  gap-12 items-center">
          <motion.div
            className="text-left md:text-center w-full md:w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl md:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-text">The way developers fix</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-background">bugs</span>
                <span
                  className="bg-text absolute inset-0 -left-2 -top-0.5 -z-10 transform -rotate-1"
                  style={{ width: "calc(100% + 20px)" }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-text-muted text-lg xl:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {hero.subheadline}
            </motion.p>
            <div className="flex justify-center items-center">
              <EmailForm />
            </div>
          </motion.div>
{/* 
          <motion.div
            className="relative w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
              <Image src={hero.img || "/placeholder.svg"} alt="MainFocus App" fill priority className="object-cover" />
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  )
}

