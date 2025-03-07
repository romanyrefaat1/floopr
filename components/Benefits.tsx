"use client"
import * as LucideIcons from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useContent } from "@/hooks/useContent"

export default function Benefits() {
  const { benefits: content } = useContent()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Helper function to render Lucide icons from string names
  const renderIcon = (iconName: string, className: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    return Icon ? <Icon className={className} /> : null
  }

  return (
    <section id={content.section.id} className="bg-primary px-[18px] py-12 md:py-24" ref={ref}>
      <div className="container md:flex md:flex-row gap-8 px-4 max-w-7xl">
        <motion.div
          className="top-24 flex-1 z-10 mb-[30px] md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              {content.section.heading.title}{" "}
              <span className="text-secondary">{content.section.heading.highlight}</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg">{content.section.heading.description}</p>
          </div>
        </motion.div>

        <div className="flex-1 bg-background rounded">
          <div className="flex flex-col gap-8 md:gap-12">
            {content.items.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center group p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary mx-auto bg-black rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  {renderIcon(benefit.icon, "w-8 h-8 text-secondary")}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">{benefit.title}</h3>
                <p className="text-white/70 text-sm md:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

