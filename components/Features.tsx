"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { useContent } from "@/hooks/useContent"
import { CheckCircle } from "lucide-react"

// DetailedFeature component
const DetailedFeature = ({
  title,
  list,
}: {
  title?: string
  list?: Array<{
    name: string
    special: boolean
  }>
}) => {
  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.h3
        className="text-2xl leading-8 font-semibold text-text mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.ul
        className="text-text-muted list-disc pl-6 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {list?.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {feature?.special ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-white-500" />
            )}
            <span>{feature?.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

// FeatureIcon component
const FeatureIcon = ({ icon: iconName }: { icon: string }) => {
  const Icon = Icons[iconName as keyof typeof Icons]
  return (
    <div className="p-2 bg-secondary/10 rounded-lg inline-block">
      <Icon className="w-4 h-4 text-secondary" />
    </div>
  )
}

export default function Features() {
  const { features } = useContent()
  const [currComponent, setCurrComponent] = useState(features.items[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = features.items.findIndex((f) => f === currComponent)
      const nextIndex = (currentIndex + 1) % features.items.length
      setCurrComponent(features.items[nextIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [currComponent, features.items])

  return (
    <section className="bg-primary py-12 md:py-24" id="features">
      <div className="container mx-auto max-w-9xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 px-20">{features.title}</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base">{features.subtitle}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 md:gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.items.map((feature) => (
            <motion.button
              key={feature.component}
              onClick={() => setCurrComponent(feature)}
              className={`p-3 rounded-md transition-all duration-200 flex-shrink-0 min-w-[120px] 
                ${currComponent === feature ? "bg-backgroundLt text-white shadow-sm" : "bg-background text-text"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <FeatureIcon icon={feature.icon} />
                <h3 className="text-sm font-semibold">{feature.title}</h3>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 bg-background rounded-lg p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DetailedFeature title={currComponent?.info?.title} list={currComponent?.info?.list} />
        </motion.div>
      </div>
    </section>
  )
}

