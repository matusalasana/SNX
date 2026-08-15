import {
  Github,
  Linkedin,
  Mail,
  Send,
  Phone,
} from "lucide-react";

const SocialMedias = () => {
  return (
    <div className="mt-10 flex gap-5">
      <a
        href="https://github.com/matusalasana"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded-lg border border-border p-3 text-content transition-colors hover:border-primary hover:text-primary"
      >
        <Github size={22} />
      </a>

      <a
        href="https://www.linkedin.com/in/sana-matusala-b111a7366"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded-lg border border-border p-3 text-content transition-colors hover:border-primary hover:text-primary"
      >
        <Linkedin size={22} />
      </a>

      <a
        href="mailto:matusalasana@gmail.com"
        aria-label="Email"
        className="rounded-lg border border-border p-3 text-content transition-colors hover:border-primary hover:text-primary"
      >
        <Mail size={22} />
      </a>

      <a
        href="http://t.me/sana1514"
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram"
        className="rounded-lg border border-border p-3 text-content transition-colors hover:border-primary hover:text-primary"
      >
        <Send size={22} />
      </a>

      <a
        href="tel:+251945807386"
        aria-label="Phone"
        className="rounded-lg border border-border p-3 text-content transition-colors hover:border-primary hover:text-primary"
      >
        <Phone size={22} />
      </a>
    </div>
  );
};


export default SocialMedias;