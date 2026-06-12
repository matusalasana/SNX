import { motion } from "framer-motion"
import { Globe, Github } from "lucide-react"

const ProjectCard = ({project, i}) => {
  return (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
        >
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white md:text-xl">
              {project.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400 md:text-base">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition group-hover:border-cyan-400/30 group-hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-6 flex items-center gap-6">
              <a
                href={project.demo}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-400"
              >
                <Globe size={16} />
                Live
              </a>

              <a
                href={project.repo}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-400"
              >
                <Github size={16} />
                Code
              </a>
            </div>
          </div>
        </motion.div>
  )
}

export default ProjectCard