import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative mx-auto max-w-4xl px-6 pt-32 pb-24 text-center flex flex-col items-center">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-medium mb-8 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Available for new projects
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Sana</span>.
        <span className="block text-3xl md:text-4xl mt-4 font-medium text-zinc-700 dark:text-zinc-400">
          Full Stack Developer
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-600 dark:text-zinc-400 max-w-lg text-lg leading-relaxed mb-10">
        Building fast, scalable web applications with clean architecture, modern tooling, and elegant user experiences.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          to="/projects"
          className="group inline-flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:bg-amber-500 dark:hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
        >
          View Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <a
          href="/Sana_Matusala_Resume.pdf"
          download
          className="inline-flex items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
