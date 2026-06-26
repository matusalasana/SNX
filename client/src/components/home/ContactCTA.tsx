import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden border-t border-zinc-200 py-28 text-center dark:border-zinc-800">
      {/* Background glow (subtle + theme aware) */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white">
        Let’s Build Something Great
      </h2>

      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
        Open for internships, freelance work, and collaborations. Let’s create
        something impactful together.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        {/* Primary CTA */}
        <Link
          to="/contact"
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl
            bg-amber-500
            px-6 py-3
            font-medium text-black
            transition-colors duration-300
            hover:bg-amber-400
          "
        >
          <Mail className="h-4 w-4" />
          Contact Me
        </Link>

        {/* Secondary CTA */}
        <Link
          to="/projects"
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl
            border border-zinc-200
            bg-white
            px-6 py-3
            font-medium text-zinc-900
            transition-all duration-300
            hover:border-amber-400
            hover:text-amber-500
            dark:border-zinc-800
            dark:bg-zinc-900
            dark:text-white
            dark:hover:border-amber-500
            dark:hover:text-amber-400
          "
        >
          View Work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}