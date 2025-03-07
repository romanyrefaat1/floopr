"use client"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureIconProps {
  icon: LucideIcon
  text: string
}

export default function FeatureIcon({ icon: Icon, text }: FeatureIconProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full"
      whileHover={{ scale: 1.01 }}
    >
      <Icon className="w-4 h-4 text-secondary" />
      <span className="text-sm font-medium text-text">{text}</span>
    </motion.div>
  )
}

