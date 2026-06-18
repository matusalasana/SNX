import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section className="relative max-w-5xl mx-auto py-28 border-t border-zinc-900 text-center overflow-hidden">

      {/* Glow background */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-[400px] h-[400px] bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Let’s Build Something Great
      </h2>

      <p className="text-zinc-400 mt-5 max-w-xl mx-auto leading-relaxed">
        Open for internships, freelance work, and collaborations.
        Let’s create something impactful together.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

        {/* Contact */}
        <Link
          to="/contact"
          className="
            inline-flex items-center justify-center gap-2
            px-6 py-3 rounded-xl
            bg-amber-500 text-black font-medium
            hover:bg-amber-400
            transition-all duration-300
            shadow-lg shadow-amber-500/20
          "
        >
          <Mail className="w-4 h-4" />
          Contact Me
        </Link>

        {/* Projects */}
        <Link
          to="/projects"
          className="
            inline-flex items-center justify-center gap-2
            px-6 py-3 rounded-xl
            border border-zinc-700 text-white
            hover:border-amber-500/40 hover:text-amber-300
            transition-all duration-300
          "
        >
          View Work
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}