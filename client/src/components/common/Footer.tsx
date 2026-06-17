import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto py-10 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Sana Matusala. Built with React & Tailwind.
        </p>

        <div className="flex items-center gap-5">
          <a className="text-zinc-400 hover:text-amber-400 transition">
            <Github className="w-4 h-4" />
          </a>

          <a className="text-zinc-400 hover:text-amber-400 transition">
            <Linkedin className="w-4 h-4" />
          </a>

          <a className="text-zinc-400 hover:text-amber-400 transition">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}