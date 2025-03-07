"use client"

import { motion } from "framer-motion"
import { useContent } from "../hooks/useContent"

export default function Demo() {
  const { demo } = useContent()
  return (
    <section id="demo" className="bg-primary py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-8">{demo.title}</h2>
          <div className="relative rounded-2xl overflow-hidden bg-primary/50 h-fit flex items-center justify-center">
            <video className="rounded-2xl" src={demo.videoSrc} controls></video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

