"use client"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"

interface SocialLinkProps {
  name: string
  url: string
  icon: keyof typeof Icons
}

const SocialLink = ({ name, url, icon }: SocialLinkProps) => {
  const Icon = Icons[icon]

  return (
    <motion.a
      href={url}
      className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">{name}</span>
    </motion.a>
  )
}

export default SocialLink

