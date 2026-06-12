const AboutMe = () => {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
        {/* Left */}
        <div>
          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400 uppercase">
            About Me
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Building applications people actually use.
          </h2>

          <div className="mt-6 h-px w-16 bg-cyan-400/40" />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <p className="text-base leading-7 text-slate-400 md:text-lg">
            I'm a full-stack developer focused on building responsive,
            performant, and maintainable web applications. I enjoy working
            across the entire development lifecycle—from intuitive UI design
            to scalable backend systems and APIs.
          </p>

          <p className="text-base leading-7 text-slate-400 md:text-lg">
            My primary stack includes React, TypeScript, Node.js, Express,
            PostgreSQL, MongoDB, Redis, and Docker.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutMe