"use client"
import { motion } from "framer-motion"
import { useContent } from "../hooks/useContent"
import Image from "next/image"

export default function AboutFounder() {
  const { founder } = useContent()

  return (
    <section className="bg-primary py-24" id="founder">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-7 mb-[10px]">
            <div className="relative w-52 h-52 md:w-full md:h-auto aspect-square">
              <Image
                src={founder.image || "/placeholder.svg"}
                alt={founder.name}
                fill
                className="rounded-full sm:rounded object-cover"
              />
            </div>
            <div className="text-center md:text-left flex flex-col gap-3">
              <h2 className="text-xl font-medium text-text">{founder.story.intro}</h2>
              <p className="text-text-muted leading-relaxed">{founder.story.description}</p>
            </div>
          </div>

          <div className="prose prose-invert mx-auto mt-8">
            <p className="text-text-muted leading-relaxed">{founder.story.background}</p>
            <p className="text-text-muted leading-relaxed mt-4 font-medium">{founder.story.mission.title}</p>
            <ol className="text-text-muted list-decimal text-left pl-6 mt-4 space-y-2">
              {founder.story.mission.points.map((point, index) => (
                <li key={index}>
                  <span className="text-text">{point}</span>
                </li>
              ))}
            </ol>
            <p className="text-text-muted leading-relaxed mt-4">{founder.story.conclusion}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

