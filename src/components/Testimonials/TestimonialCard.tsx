"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  quote: string
  rating: number
  delay?: number
}

const TestimonialCard = ({ name, role, image, quote, rating, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      className="flex-shrink-0 w-96 bg-primary p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-white/70 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-white/90 mb-4 italic">{quote}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
        ))}
      </div>
    </motion.div>
  )
}

export default TestimonialCard

