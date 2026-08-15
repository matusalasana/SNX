import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container-custom flex flex-col items-center pt-32 pb-24 text-center">
      {/* Status Badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary shadow-sm">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>

        Available for new projects
      </div>

      {/* Headline */}
      <h1 className="mb-6 text-5xl font-bold tracking-tight text-content md:text-7xl">
        Hi, I'm{" "}
        <span className="text-gradient">
          Sana
        </span>
        .

        <span className="mt-4 block text-3xl font-medium text-secondary md:text-4xl">
          Full Stack Developer
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mb-10 max-w-lg text-lg leading-relaxed text-secondary">
        Building fast, scalable web applications with clean architecture,
        modern tooling, and elegant user experiences.
      </p>

      {/* CTA Buttons */}
      <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
        <Link
          to="/projects"
          className="group btn-primary rounded-xl px-6 py-3"
        >
          View Projects

          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <a
          href="/Sana_Matusala_Resume.pdf"
          download
          className="btn-outline rounded-xl px-6 py-3 font-semibold"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;