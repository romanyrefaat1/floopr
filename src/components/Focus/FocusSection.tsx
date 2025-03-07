"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import EmailSignup from "../EmailSignup"
import { useContent } from "../../hooks/useContent"

export default function FocusSection() {
  const { focus } = useContent()
  const [email, setEmail] = useState<string>("")

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
          <EmailSignup className="w-full max-w-md" email={email} setEmail={setEmail} />
        </motion.div>
      </div>
    </section>
  )
}

