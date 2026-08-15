import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section className="container-custom relative overflow-hidden border-t border-border bg-background py-28 text-center">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-0 flex justify-center">
        <div className="size-[350px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-bold tracking-tight text-content md:text-5xl">
          Let’s Build Something Great
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-secondary">
          Open for internships, freelance work, and collaborations. Let’s
          create something impactful together.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          {/* Primary CTA */}
          <Link
            to="/contact"
            className="btn-primary rounded-xl px-6 py-3"
          >
            <Mail className="size-4" />
            Contact Me
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/projects"
            className="btn-outline rounded-xl px-6 py-3"
          >
            View Work
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}