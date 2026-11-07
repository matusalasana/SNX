import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Magnetic from "../motion/Magnetic";
import ScrambleText from "../motion/ScrambleText";

const Hero = () => {
  return (
    <section className="container-custom relative pt-20 pb-24 md:pt-28">
      {/* Asymmetric interactive badges */}
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <span className="inline-flex -rotate-2 items-center gap-2 border-[3px] border-ink bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-on-accent shadow-neo transition-transform hover:rotate-0">
          <span className="size-2 animate-pulse bg-primary" />
          Available for new projects
        </span>

        <span className="inline-flex rotate-1 items-center border-[3px] border-ink bg-accent-2 px-3 py-1 text-xs font-black uppercase tracking-widest text-on-accent shadow-neo transition-transform hover:rotate-0">
          Addis Ababa · Remote
        </span>
      </div>

      {/* Oversized headline */}
      <h1 className="font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.88] font-black tracking-tighter text-content uppercase">
        <span className="block">I build</span>
        <span className="relative block">
          <span className="text-gradient">the web</span>
          <span className="text-primary">.</span>
        </span>
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        {/* Web mission */}
        <aside className="relative border-[3px] border-ink bg-card p-6 shadow-neo-lg md:col-span-7 md:-rotate-1">
          <span className="absolute -top-4 left-4 border-[3px] border-ink bg-primary px-2 py-0.5 text-xs font-black uppercase tracking-widest text-on-primary">
            Web Mission
          </span>

          <p className="pt-2 text-xl leading-snug font-bold text-content md:text-2xl">
            Hi, I'm Sana, a{" "}
            <ScrambleText text="Full Stack Developer" className="bg-accent px-1 text-on-accent" />{" "}
            shipping fast, honest, over-engineered-where-it-counts software:
            clean architecture, modern tooling, interfaces that don't apologise.
          </p>
        </aside>

        {/* CTAs */}
        <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end md:justify-end">
          <Magnetic>
            <Link to="/projects" className="group btn-primary px-6 py-3 text-base">
              View Projects
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          <Magnetic>
            <a href="/Sana_Matusala_Resume.pdf" download className="btn-outline px-6 py-3 text-base">
              <Download className="size-5" />
              Download Resume
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Hero;
