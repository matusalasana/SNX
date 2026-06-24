import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Full-Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2025",
    link: "https://www.freecodecamp.org/certification/yourname",
  },
  {
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024",
    link: "https://www.coursera.org/professional-certificates/meta-react",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    link: "https://www.freecodecamp.org/certification/yourname",
  },
];

export default function Certifications() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-zinc-100">
          Certifications
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Professional courses and verified achievements
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="
              group rounded-xl p-5
              border border-neutral-200 dark:border-neutral-800
              bg-white dark:bg-neutral-900
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-500/40
            "
          >
            {/* Issuer */}
            <div className="flex items-center gap-2 text-amber-500 mb-3">
              <Award size={18} />
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {cert.issuer}
              </span>
            </div>

            {/* Title */}
            <h3 className="
              text-lg font-semibold mb-1
              text-neutral-900 dark:text-neutral-100
              group-hover:text-amber-500
            ">
              {cert.title}
            </h3>

            {/* Date */}
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Completed: {cert.date}
            </p>

            {/* Link */}
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 text-sm
                  text-neutral-600 dark:text-neutral-400
                  hover:text-amber-500
                "
              >
                <span className="border-b border-transparent hover:border-amber-500">
                  View Certificate
                </span>
                <ExternalLink size={14} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}