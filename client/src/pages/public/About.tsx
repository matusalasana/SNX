import {
  Download,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";

export default function About() {
  const experiences = [
    {
      role: "Full Stack Developer (Intern / Freelance)",
      company: "Self-Employed / Projects",
      period: "2024 - Present",
      description:
        "Built full-stack web applications using React, TypeScript, Node.js, and PostgreSQL. Focused on REST APIs, authentication systems, and scalable backend design.",
    },
  ];

  const education = [
    {
      school: "Software Engineering / Computer Science",
      institution: "Addis Ababa (Self-learning / Institution TBD)",
      period: "2023 - Present",
    },
  ];

  const certifications = [
    "React - Advanced Concepts",
    "Node.js Backend Development",
    "TypeScript Fundamentals",
    "Database Design (PostgreSQL)",
  ];

  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Git",
    "Tailwind CSS",
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* HERO / PROFILE */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-cyan-400">ABOUT ME</p>

          <h1 className="mt-4 text-5xl font-black md:text-7xl">
            Full Stack Developer
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            I am a passionate Full Stack Developer focused on building
            scalable, performant, and user-friendly web applications using
            modern technologies like React, TypeScript, Node.js, and
            PostgreSQL.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-6 text-3xl font-bold">My Story</h2>

        <p className="max-w-4xl leading-8 text-slate-400">
          I started my journey in software development by learning the
          fundamentals of HTML, CSS, and JavaScript. Over time, I moved
          into modern frameworks like React and backend development with
          Node.js. I enjoy building real-world applications that solve
          meaningful problems and continuously improving my skills through
          hands-on projects.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="border-y border-white/10 bg-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 flex items-center gap-2 text-3xl font-bold">
            <Briefcase size={22} /> Experience
          </h2>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.role}
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-6"
              >
                <h3 className="text-xl font-semibold">
                  {exp.role}
                </h3>

                <p className="text-cyan-400">
                  {exp.company}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {exp.period}
                </p>

                <p className="mt-4 text-slate-400 leading-7">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-10 flex items-center gap-2 text-3xl font-bold">
          <GraduationCap size={22} /> Education
        </h2>

        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">
                {edu.school}
              </h3>

              <p className="text-cyan-400">
                {edu.institution}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="border-y border-white/10 bg-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 flex items-center gap-2 text-3xl font-bold">
            <Award size={22} /> Certifications
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-6"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-10 text-3xl font-bold">Skills</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-300 transition hover:border-cyan-400"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}