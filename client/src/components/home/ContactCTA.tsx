import { Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="max-w-5xl mx-auto py-28 border-t border-zinc-900 text-center">
      <h2 className="text-4xl font-bold text-white">
        Let’s Build Something Great
      </h2>

      <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
        Open for internships, freelance work, and collaborations.
        Let’s create something impactful together.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="mailto:youremail@example.com"
          className="px-6 py-3 rounded-xl bg-amber-500 text-black font-medium hover:bg-amber-400 transition flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Contact Me
        </a>

        <a
          href="#projects"
          className="px-6 py-3 rounded-xl border border-zinc-700 text-white hover:border-amber-500/40 transition"
        >
          View Work
        </a>
      </div>
    </section>
  );
}