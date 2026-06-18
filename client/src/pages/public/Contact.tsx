import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import MessageForm from "../../components/common/MessageForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

            <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Contact
            </span>

            <div className="w-10 h-px bg-gradient-to-l from-amber-400 to-transparent" />
          </div>

          <h1 className="text-4xl font-bold">
            Let’s work <span className="text-amber-400">together</span>
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-sm">
            Got an idea, opportunity, or just want to say hi? I’m always open
            to discussing new projects and collaborations.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: INFO CARDS */}
          <div className="space-y-6">

            {/* EMAIL */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <Mail className="w-5 h-5" />
                <h2 className="font-semibold">Email</h2>
              </div>
              <p className="text-zinc-400 text-sm">
                youremail@example.com
              </p>
            </div>

            {/* LOCATION */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <MapPin className="w-5 h-5" />
                <h2 className="font-semibold">Location</h2>
              </div>
              <p className="text-zinc-400 text-sm">
                Addis Ababa, Ethiopia
              </p>
            </div>

            {/* SOCIALS */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
              <h2 className="font-semibold text-amber-400 mb-4">
                Social Links
              </h2>

              <div className="flex gap-4 text-zinc-400">
                <a
                  href="#"
                  className="hover:text-amber-400 transition"
                >
                  <Github />
                </a>

                <a
                  href="#"
                  className="hover:text-amber-400 transition"
                >
                  <Linkedin />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: MESSAGE FORM */}
          <div>
            <MessageForm />
          </div>

        </div>
      </section>
    </main>
  );
}