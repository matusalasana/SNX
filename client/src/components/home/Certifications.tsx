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
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
          Certifications
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
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
            className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Issuer */}
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <Award size={18} />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {cert.issuer}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-1 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-amber-500 dark:text-zinc-100">
              {cert.title}
            </h3>

            {/* Date */}
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Completed: {cert.date}
            </p>

            {/* Link */}
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-amber-500 dark:text-zinc-400"
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
