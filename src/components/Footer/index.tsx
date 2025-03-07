"use client"
import { motion } from "framer-motion"
import SocialLink from "./SocialLink"
import content from "../../config/content.json"

const Footer = () => {
  const { footer } = content

  return (
    <footer className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            {footer.social.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-text-muted">
            {footer.links.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
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

export default Footer

