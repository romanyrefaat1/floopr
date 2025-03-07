"use client"
import { motion } from "framer-motion"
import { FaProductHunt, FaReddit } from "react-icons/fa"
import { useContent } from "../hooks/useContent"

const iconMap = {
  FaProductHunt,
  FaReddit,
}

export default function FeaturedBrands() {
  const { featuredBrands } = useContent()

  return (
    <div className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          <span className="text-text-muted font-medium text-center sm:text-left">{featuredBrands.title}</span>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {featuredBrands.brands.map((brand) => {
              const Icon = iconMap[brand.icon as keyof typeof iconMap]
              return (
                <motion.a
                  key={brand.name}
                  href="#"
                  className="flex items-center gap-2 text-text-muted hover:text-text transition-colors"
                  whileHover={{ scale: 1.05 }}
                  style={{ color: brand.hoverColor }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{brand.name}</span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

