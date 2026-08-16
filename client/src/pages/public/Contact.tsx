import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import MessageForm from "../../components/forms/MessageForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-background text-content transition-default">
      <section className="container-custom section">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="flex-center mb-3 gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-primary text-xs font-medium uppercase tracking-[0.25em]">
              Contact
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-primary to-transparent" />
          </div>

          <h1 className="heading text-4xl sm:text-5xl">
            Let’s work <span className="text-primary">together</span>
          </h1>
          <p className="subheading mx-auto mt-4 max-w-2xl text-base">
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
            
            <div className="card space-y-4">
              <h2 className="text-primary font-semibold">Social Links</h2>
              <div className="flex-start gap-4">
                <a
                  href="https://github.com/matusalasana"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost p-2"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sana-matusala-b111a7366"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost p-2"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
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
type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
};

const ContactCard = ({ icon, title, value, href }: ContactCardProps) => (
  <div className="card space-y-3">
    <div className="flex-start text-primary gap-2">
      {icon}
      <h2 className="heading text-base font-semibold">{title}</h2>
    </div>
    {href ? (
      <a href={href} className="link text-sm font-medium">
        {value}
      </a>
    ) : (
      <p className="subheading text-sm font-medium">{value}</p>
    )}
  </div>
);
