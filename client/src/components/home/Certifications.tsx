import { motion } from "framer-motion";

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

const certifications = [
  {
    title: "Meta Frontend Professional",
    issuer: "Meta",
    link: "https://coursera.org/verify/professional-cert/92JSPAERF9W9",
  },
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    link: "https://freecodecamp.org/certification/sana1514/responsive-web-design",
  },
  {
    title: "Backend And API Development",
    issuer: "FreeCodeCamp",
    link: null,
  },
  {
    title: "Relational Database",
    issuer: "FreeCodeCamp",
    link: null,
  },
];

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="relative py-20 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          Certifications <span className="text-primary-yellow">&</span>{" "}
          Achievements
        </h2>
        <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed">
          Industry certifications and recognitions that validate my skills and
          commitment to continuous learning.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary-yellow/50 hover:shadow-[0_10px_40px_rgba(202,138,4,0.15)]"
          >
            {/* Glow accent */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary-yellow/10 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Title */}
              <h3 className="font-semibold text-base sm:text-lg leading-snug mb-2 text-white/90 group-hover:text-white transition">
                {cert.title}
              </h3>

              {/* Issuer badge */}
              <span className="inline-flex w-fit items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] text-secondary mb-5">
                {cert.issuer}
              </span>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Link */}
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-secondary group-hover:text-primary-yellow transition-colors"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 group-hover:after:w-full after:bg-primary-yellow after:transition-all">
                    View Credential
                  </span>
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span className="text-xs text-secondary/60">
                  No public credential
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;