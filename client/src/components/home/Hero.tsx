import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center dark:bg-zinc-900">

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Available for work
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 max-w-2xl leading-none mb-6">
        Sana Matusala

        <span className="block text-amber-500 text-4xl md:text-5xl mt-2 font-normal">
          Full Stack Developer
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-400 max-w-lg text-base md:text-lg leading-relaxed font-light mb-10">
        Building fast, scalable web applications with clean architecture, modern tooling, and elegant user experience.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full sm:w-auto">

        {/* Primary CTA */}
        <Link
          to="/projects"
          className="
            group inline-flex items-center gap-1.5
            bg-gray-900 dark:bg-gray-100
            text-white dark:text-gray-900
            font-medium px-5 py-2.5 rounded-lg text-sm
            hover:bg-amber-500 hover:text-black
            w-full sm:w-auto justify-center
          "
        >
          View Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Secondary CTA */}
        <a
          href="/Sana_Matusala_Resume.pdf"
          download
          className="
            inline-flex items-center justify-center
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-600 dark:text-gray-300
            hover:text-amber-500 hover:border-amber-500/40
            px-5 py-2.5 rounded-lg text-sm font-medium
            w-full sm:w-auto
          "
        >
          Download Resume
        </a>

      </div>
    </section>
  );
};

export default Hero;