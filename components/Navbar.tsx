"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useContent } from "@/hooks/useContent"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const { brand, navbar } = useContent()

  const sections = navbar.links

  useEffect(() => {
    const updateNavHeight = () => {
      const navElement = document.getElementById("navbar")
      if (navElement) {
        setNavHeight(navElement.offsetHeight)
      }
    }

    updateNavHeight()
    window.addEventListener("resize", updateNavHeight)

    return () => {
      window.removeEventListener("resize", updateNavHeight)
    }
  }, [])

  return (
    <motion.nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm"
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex items-center justify-between relative z-10">
          <motion.span className="text-secondary text-xl font-bold" whileHover={{ scale: 1.01 }}>
            <a href="/">{brand.name}</a>
          </motion.span>

          <div className="hidden md:flex gap-8">
           
            <Link href={`#join-us`} className="text-secondary hover:text-secondary/80 transition-colors">Join us</Link>
          </div>

          <button
            className="md:hidden text-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            name="menu"
            aria-label={isMenuOpen ? "Close the dialog" : "Open the dialog"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="fixed inset-x-0 bg-primary z-40"
          style={{
            top: `${navHeight}px`,
            height: `calc(100vh - ${navHeight}px)`,
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {sections.map((section, index) => (
              <motion.a
                key={section.name}
                href={`${section.url}`}
                className={`text-2xl font-semibold ${
                  section.special ? "text-secondary" : "text-text-muted"
                } hover:text-text`}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {section.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

