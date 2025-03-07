"use client"
import { motion } from "framer-motion"
import content from "../../config/content.json"

const AboutFounder = () => {
  const { founder } = content

  return (
    <section className="bg-primary py-24" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-7 mb-[10px]">
            <img
              src={founder.image}
              alt={founder.name}
              className="max-w-52 md:w-full aspect-square rounded-full sm:rounded object-cover"
            />
            <div className="text-center md:text-left flex flex-col gap-3">
              <h2 className="text-xl font-medium text-text">{founder.story.intro}</h2>
              <p className="text-text-muted leading-relaxed">{founder.story.description}</p>
            </div>
          </div>

          <div className="prose prose-invert mx-auto mt-8">
            <p className="text-text-muted leading-relaxed">
              Like many of us, I've faced the struggles of managing overwhelming workloads and staying productive.
            </p>
            <p className="text-text-muted leading-relaxed mt-4 font-medium">So I built MainFocus for 3 reasons:</p>
            <ol className="text-text-muted list-decimal text-left pl-6 mt-4 space-y-2">
              {founder.story.mission.map((reason, index) => (
                <li key={index}>
                  <span className="text-text">{reason}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutFounder

