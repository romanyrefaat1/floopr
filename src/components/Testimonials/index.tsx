"use client"
import { motion } from "framer-motion"
import { useAutoScroll } from "../../hooks/useAutoScroll"
import TestimonialCard from "./TestimonialCard"
import content from "../../config/content.json"

const Testimonials = () => {
  const { ref } = useAutoScroll()
  const { testimonials } = content

  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center text-text mb-16 mx-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {testimonials.title}
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={ref} className="flex gap-8 overflow-x-hidden">
            <div className="flex gap-8 animate-scroll">
              {[...testimonials.items, ...testimonials.items].map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

