"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface DetailedFeatureProps {
  title?: string
  list?: Array<{
    name: string
    special: boolean
  }>
}

const DetailedFeature = ({ title, list }: DetailedFeatureProps) => {
  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.h3
        className="text-2xl font-semibold text-text mb-4"
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

export default DetailedFeature

