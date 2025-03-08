"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/useContent"

// FAQItem component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div
        className="flex gap-8 justify-between items-center bg-primary p-4 rounded-lg cursor-pointer hover:bg-opacity-90 transition-colors duration-200"
        onClick={onToggle}
      >
        <h2 className={`text-lg font-medium ${isOpen ? "text-secondary" : "text-text"}`}>{question}</h2>
        <motion.div
          className="relative flex items-center justify-center w-6 h-6"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <span className="text-text-muted text-2xl">−</span>
          ) : (
            <span className="text-secondary text-2xl">+</span>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isOpen && (
          <div className="bg-primary p-4 mt-2 rounded-lg">
            <p className="text-text-muted">{answer}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  const { faq } = useContent()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-background font-inter px-6 py-12" id="faq">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <motion.div
          className="md:w-1/2 h-fit"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-text mb-4">{faq.title}</h1>
          <p className="text-text-muted">
            {faq.contact.text}{" "}
            <a className="text-text underline" href={`https://x.com/romanyrefaat_`}>
              X
            </a>
          </p>
        </motion.div>

        <div className="md:w-2/3 space-y-4">
          {faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

