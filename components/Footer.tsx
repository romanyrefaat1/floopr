"use client"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { useContent } from "@/hooks/useContent"

export default function Footer() {
  const { footer } = useContent()

  return (
    <footer className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            {footer.social.map(({ icon: iconName, name, url }) => {
              const Icon = Icons[iconName as keyof typeof Icons]
              return (
                <motion.a
                  key={name}
                  href={url}
                  className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">{name}</span>
                </motion.a>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-text-muted">
            {footer.links.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                target="_blank"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

