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
    <section id="services" className="container-custom py-24">
      {/* Header */}
      <div className="mb-14 max-w-3xl">
        <span className="badge mb-4 border border-border text-primary">
          Services & Skills
        </span>

        <h2 className="text-4xl font-black tracking-tight text-content md:text-6xl">
          Building Digital{" "}
          <span className="block text-gradient">
            Experiences
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary">
          From modern user interfaces to scalable backend systems, I build
          complete web applications designed for performance, usability, and
          growth.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="
              card
              group
              relative
              overflow-hidden
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-primary
            "
          >
            {/* Brand Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-content">
                {service.title}
              </h3>

              <p className="mb-6 text-sm leading-7 text-secondary">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border border-border
                      bg-muted
                      px-3 py-1
                      text-xs
                      text-secondary
                      transition-colors
                      duration-200
                      hover:border-primary/30
                      hover:text-primary
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