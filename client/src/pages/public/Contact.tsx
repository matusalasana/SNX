import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

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

    // Replace with EmailJS / backend API later
    console.log("Form submitted:", form);

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* HEADER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-cyan-400">CONTACT</p>

          <h1 className="mt-4 text-5xl font-black md:text-7xl">
            Get In Touch
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            Have a project in mind or want to collaborate? Feel free to reach
            out — I’m always open to opportunities.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* CONTACT FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-6 text-2xl font-bold">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 outline-none focus:border-cyan-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 outline-none focus:border-cyan-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 outline-none focus:border-cyan-400"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-[#0f172a] transition hover:bg-cyan-400"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="mb-6 text-2xl font-bold">
                Contact Information
              </h2>

              <div className="space-y-5 text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-cyan-400" size={18} />
                  <span>matusalasala@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="text-cyan-400" size={18} />
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-400"
                  >
                    github.com/yourusername
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="text-cyan-400" size={18} />
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-400"
                  >
                    linkedin.com/in/yourprofile
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={18} />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>

            {/* QUICK CTA */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
              <h3 className="text-xl font-bold">
                Let's build something amazing 🚀
              </h3>

              <p className="mt-3 text-slate-400">
                Open to internships, freelance, and full-time opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}