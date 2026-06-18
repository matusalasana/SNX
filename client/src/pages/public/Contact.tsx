import { Mail, Send, MapPin, Github, Linkedin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // replace with API / email service later
    console.log(form);
  };

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Contact
          </span>
        </div>

        <h1 className="text-4xl font-bold">
          Let’s build something <span className="text-amber-400">great</span>
        </h1>

        <p className="text-zinc-400 mt-4 max-w-2xl">
          Got an idea, opportunity, or collaboration? I’m always open to
          discussing new projects and ideas.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Mail className="w-5 h-5" />
              <h2 className="font-semibold">Email</h2>
            </div>
            <p className="text-zinc-400 text-sm">youremail@example.com</p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <MapPin className="w-5 h-5" />
              <h2 className="font-semibold">Location</h2>
            </div>
            <p className="text-zinc-400 text-sm">Addis Ababa, Ethiopia</p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <h2 className="font-semibold text-amber-400 mb-3">
              Connect
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

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 space-y-5"
        >
          <div>
            <label className="text-sm text-zinc-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:border-amber-500 outline-none resize-none"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              bg-amber-500 text-black font-medium
              hover:bg-amber-400 transition
            "
          >
            Send Message <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}