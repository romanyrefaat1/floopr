"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useContent } from "@/hooks/useContent"
import Image from "next/image"

export default function Testimonials() {
  const { testimonials: testi } = useContent()
  const [items, setItems] = useState([...testi.items, ...testi.items, ...testi.items])
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const handleScroll = () => {
      const cardWidth = 384 + 32 // width + gap
      const totalWidth = cardWidth * testi.items.length

      if (scrollElement.scrollLeft >= totalWidth) {
        scrollElement.scrollLeft -= totalWidth
      } else if (scrollElement.scrollLeft <= 0) {
        scrollElement.scrollLeft += totalWidth
      }

      setScrollPosition(scrollElement.scrollLeft)
    }

    const scroll = () => {
      scrollElement.scrollBy({
        left: 1.5,
        behavior: "auto",
      })
    }

    scrollElement.addEventListener("scroll", handleScroll)
    const intervalId = setInterval(scroll, 20)

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll)
      clearInterval(intervalId)
    }
  }, [testi.items.length])

  return (
    <section id="testimonials" className="bg-background py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center text-text mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {testi.title.text} <span className="text-secondary">{testi.title.special}</span>
        </motion.h2>

        <div className="relative mx-auto max-w-7xl">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden px-32 relative w-full"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            {items.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-96 bg-primary p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index, testi.items.length - 1) * 0.1,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4 italic">{testimonial.quote}</p>
                <div className="text-[#FFD700] text-sm font-medium">{testimonial.rating}/5 - Excellent</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

