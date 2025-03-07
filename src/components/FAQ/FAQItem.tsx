"use client"
import { motion } from "framer-motion"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => {
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

export default FAQItem

