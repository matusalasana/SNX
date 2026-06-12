import { Github, Linkedin, Mail, Send, Phone, ArrowRight } from "lucide-react";

const SocialMedias = () => {
  return (
    <div className="mt-10 flex gap-5">
      <a
        href="https://github.com/matusalasana"
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-slate-700 p-3 transition hover:border-cyan-400"
      >
        <Github size={22} />
      </a>
  
      <a
        href="https://www.linkedin.com/in/sana-matusala-b111a7366"
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-slate-700 p-3 transition hover:border-cyan-400"
      >
        <Linkedin size={22} />
      </a>
  
      <a
        href="mailto:matusalasana@gmail.com"
        className="rounded-lg border border-slate-700 p-3 transition hover:border-cyan-400"
      >
        <Mail size={22} />
      </a>
      
      <a
        href="http://t.me/sana1514"
        className="rounded-lg border border-slate-700 p-3 transition hover:border-cyan-400"
      >
        <Send size={22} />
      </a>
      
      <a
        href="tel:+251945807386"
        className="rounded-lg border border-slate-700 p-3 transition hover:border-cyan-400"
      >
        <Phone size={22} />
      </a>
    </div>
  )
}

export default SocialMedias