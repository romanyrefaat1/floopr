"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import FAQItem from "./FAQItem"
import content from "../../config/content.json"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { faq } = content

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
            <a className="text-text underline" href={`mailto:${faq.contact.email}`}>
              Email
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

export default FAQ

