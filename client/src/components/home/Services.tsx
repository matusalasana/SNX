import { motion } from "framer-motion";

const services = [
  {
    title: "Full-Stack Web Apps",
    desc: "End-to-end web applications with React frontends, Node.js backends, and robust database architectures built to scale.",
    tags: ["React", "Node.js", "PostgreSQL", "MongoDB", "Express"],
  },
  {
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive user interfaces with smooth animations, modern design systems, and a mobile-first approach.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & APIs",
    desc: "Secure RESTful APIs and server-side logic with authentication, database integration, and scalable architecture.",
    tags: ["Node.js", "Express", "REST API", "JWT"],
  },
  {
    title: "Database Design",
    desc: "Optimized database schemas, complex queries, and data management for both SQL and NoSQL databases.",
    tags: ["MongoDB", "PostgreSQL"],
  },
  {
    title: "AI Integration",
    desc: "AI-powered features including chatbots, intelligent automation, summarization, and custom AI workflows.",
    tags: ["OpenAI", "Gemini API"],
  },
  {
    title: "Deployment & DevOps",
    desc: "Production deployments with CI/CD, version control, cloud platforms, and Linux server management.",
    tags: ["Git", "Vercel", "Netlify", "Linux"],
  },
];

const Services = () => {
  return (
    <section id="services" className="page-container">
      <div className="mb-14 max-w-3xl">
        <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
          Services & Skills
        </span>

        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          Building Digital
          <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 bg-clip-text text-transparent">
            Experiences
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
          From modern user interfaces to scalable backend systems, I build
          complete web applications designed for performance, usability, and
          growth.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-7
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-2
              hover:border-cyan-400/20
              hover:bg-white/[0.05]
              hover:shadow-[0_8px_32px_rgba(34,211,238,0.08)]
            "
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />
            </div>

            {/* Glass Shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-60" />

            <div className="relative z-10">
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">
                {svc.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-7 text-slate-400">
                {svc.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      px-3 py-1
                      text-xs
                      text-slate-400
                      backdrop-blur-md
                      transition-all duration-300
                      hover:border-cyan-400/20
                      hover:text-cyan-300
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;