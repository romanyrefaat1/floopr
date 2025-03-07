"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { ModalContext } from "@/contexts/modalContext"
import { useContent } from "@/hooks/useContent"

const EarlyAdoptersModal = () => {
  const { closeModal } = useContext(ModalContext) || {}
  const { earlyAdoptersModal: content } = useContent()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  // Helper function to render Lucide icons from string names
  const renderIcon = (iconName: string, className: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    return Icon ? <Icon className={className} /> : null
  }

  return (
    <motion.div
      className="fixed inset-0 bg-background/90 backdrop-blur-sm p-5 md:px-[80px] overflow-y-auto flex justify- w-[100vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit="exit"
      variants={containerVariants}
    >
      <div className="bg-primary rounded-2xl w-[100vw] relative shadow-xl border border-backgroundLt h-fit">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 p-2 text-text hover:text-secondary rounded-full hover:bg-backgroundLt transition-colors"
        >
          {renderIcon(content.icons.close, "h-5 w-5")}
        </button>

        <div className="p-6 sm:p-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary flex items-center gap-2">
              {content.title}
              {renderIcon(content.icons.header, "h-8 w-8")}
            </h1>
            <p className="text-lg text-text-muted">{content.subtitle}</p>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="flex items-center text-xl font-semibold text-text mb-4">
                {renderIcon(content.icons.steps.section, "mr-2 h-5 w-5 text-secondary")}
                {content.steps.title}
              </h2>
              <div className="space-y-3">
                {content.steps.items.map((step, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={listItemVariants}
                    className="flex items-start gap-3 p-4 rounded-lg bg-backgroundLt hover:bg-background transition-colors group"
                  >
                    {renderIcon(content.icons.steps.items, "w-5 h-5 flex-shrink-0 text-secondary mt-1")}
                    <span className={`${step.className} group-hover:text-secondary transition-colors`}>
                      {step.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="h-px bg-backgroundLt" />

            <section>
              <h2 className="flex items-center text-xl font-semibold text-text mb-4">
                {renderIcon(content.icons.rewards.section, "mr-2 h-5 w-5 text-secondary")}
                {content.rewards.title}
              </h2>
              <div className="space-y-3">
                {content.rewards.items.map((reward, index) => (
                  <motion.div
                    key={index}
                    custom={index + content.steps.items.length}
                    variants={listItemVariants}
                    className="flex items-start gap-3 p-4 rounded-lg bg-backgroundLt hover:bg-background transition-colors group"
                  >
                    {renderIcon(content.icons.rewards.items, "w-5 h-5 flex-shrink-0 text-secondary mt-1")}
                    <span className={`${reward.className} group-hover:text-secondary transition-colors`}>
                      {reward.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="p-5 rounded-xl bg-background border border-backgroundLt">
              <p className="text-text-muted mb-3">{content.conclusion.text}</p>
              <p className="text-secondary font-semibold">{content.conclusion.callout}</p>
            </section>
          </div>
        </div>
        <div className="flex justify-end p-6">
          <button onClick={closeModal} className="text-text-muted hover:text-text">
            Skip
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default EarlyAdoptersModal

