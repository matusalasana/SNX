import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import MessageForm from "../../components/common/MessageForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <section className="mx-auto max-w-6xl px-6 py-24">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
              Contact
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-amber-500 to-transparent" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Let’s work <span className="text-amber-500">together</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Got an idea, opportunity, or just want to say hi? I’m always open to discussing new projects and collaborations.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Info Cards */}
          <div className="space-y-6">
            <ContactCard 
              icon={<Mail className="h-5 w-5" />} 
              title="Email" 
              value="matusalasana@gmail.com" 
              href="mailto:matusalasana@gmail.com" 
            />
            <ContactCard 
              icon={<MapPin className="h-5 w-5" />} 
              title="Location" 
              value="Addis Ababa, Ethiopia" 
            />
            
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h2 className="mb-4 font-semibold text-amber-500">Social Links</h2>
              <div className="flex gap-4 text-zinc-600 dark:text-zinc-400">
                <a href="https://github.com/matusalasana" target="_blank" rel="noreferrer" className="transition hover:text-amber-500">
                  <Github />
                </a>
                <a href="https://www.linkedin.com/in/sana-matusala-b111a7366" target="_blank" rel="noreferrer" className="transition hover:text-amber-500">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <MessageForm />
        </div>
      </section>
    </main>
  );
}

// Sub-component for clean info cards
const ContactCard = ({ icon, title, value, href }: any) => (
  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
    <div className="mb-3 flex items-center gap-2 text-amber-500">
      {icon}
      <h2 className="font-semibold text-zinc-900 dark:text-white">{title}</h2>
    </div>
    {href ? (
      <a href={href} className="text-sm text-zinc-600 hover:text-amber-500 dark:text-zinc-400">{value}</a>
    ) : (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{value}</p>
    )}
  </div>
);
