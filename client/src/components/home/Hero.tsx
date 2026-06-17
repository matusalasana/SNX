import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative max-w-4xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center">
      
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Available for work
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100 max-w-2xl leading-none mb-6">
        Sana Matusala
        <span className="block text-amber-700 text-4xl md:text-5xl mt-2 font-normal">
          Full Stack Developer
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-400 max-w-lg text-base md:text-lg leading-relaxed font-light mb-10">
        Building fast, scalable web applications with clean architecture, modern tooling, and elegant user experience.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full sm:w-auto">

        {/* Router Link */}
        <Link
          to="/projects"
          className="group inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-5 py-2.5 rounded-lg text-sm transition-all w-full sm:w-auto justify-center"
        >
          View Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Resume Download */}
        <a
          href="/Sana_Matusala_Resume.pdf"
          download
          className="inline-flex items-center justify-center border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 px-5 py-2.5 rounded-lg text-sm font-medium transition-all w-full sm:w-auto"
        >
          Download Resume
        </a>

      </div>
    </section>
  );
};

export default Hero;