import React from 'react';
import { 
  ArrowUpRight, 
  Code2, 
  Database, 
  Wrench, 
  Mail, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText,
  Briefcase
} from 'lucide-react';
import Hero from "../../components/home/Hero"

// --- Mock Data ---
const projects = [
  {
    title: "Quantum Analytics Engine",
    description: "Real-time data processing and visualization for enterprise IoT networks.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "CoreShield OS",
    description: "A lightweight, security-first runtime for decentralized edge computing.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
  }
];

const techStack = {
  frontend: ["React/Next.js", "Tailwind CSS", "TypeScript", "Three.js", "Framer Motion"],
  backend: ["Node.js", "Go-Lang", "PostgreSQL", "Redis", "GraphQL"],
  tools: ["Docker", "Kubernetes", "Terraform", "Git/CI-CD", "Vercel"]
};

const articles = [
  {
    date: "MAR 12, 2024",
    title: "Optimizing Next.js for WebGL Performance"
  },
  {
    date: "FEB 28, 2024",
    title: "Architecture: Building Scalable Microservices with Go"
  },
  {
    date: "JAN 15, 2024",
    title: "The Future of Edge Computing and Wasm"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D13] text-[#F3F4F6] font-sans antialiased selection:bg-indigo-500/30">

      <Hero />

      {/* --- SELECTED WORKS --- */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-900">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Selected Works</h2>
            <p className="text-gray-400 text-sm">Engineering solutions for complex problems.</p>
          </div>
          <a href="#" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
            View Archive 
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative rounded-lg border border-gray-800/60 bg-[#111319]/40 overflow-hidden hover:border-gray-700/80 transition-all flex flex-col justify-end h-80 p-6">
              {/* Background Cover Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20 group-hover:scale-[1.02] group-hover:opacity-30 transition-all duration-500" 
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/70 to-transparent pointer-events-none" />

              {/* Card Contents */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TECHNICAL STACK --- */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-900">
        <h2 className="text-2xl font-bold text-white mb-10">Technical Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend Category */}
          <div className="p-6 rounded-lg border border-gray-800/60 bg-[#111319]/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-400 mb-6">
              <Code2 className="w-4 h-4" />
              <h3 className="font-semibold text-sm tracking-wide uppercase text-white">Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.frontend.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 text-xs rounded border border-gray-800 bg-gray-900/40 text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Category */}
          <div className="p-6 rounded-lg border border-gray-800/60 bg-[#111319]/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <Database className="w-4 h-4" />
              <h3 className="font-semibold text-sm tracking-wide uppercase text-white">Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.backend.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 text-xs rounded border border-gray-800 bg-gray-900/40 text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tools Category */}
          <div className="p-6 rounded-lg border border-gray-800/60 bg-[#111319]/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-6">
              <Wrench className="w-4 h-4" />
              <h3 className="font-semibold text-sm tracking-wide uppercase text-white">Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.tools.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 text-xs rounded border border-gray-800 bg-gray-900/40 text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL WRITING --- */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-900">
        <h2 className="text-2xl font-bold text-white mb-8">Technical Writing</h2>
        
        <div className="divide-y divide-gray-800/60">
          {articles.map((article, index) => (
            <a 
              key={index} 
              href="#" 
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 first:pt-0 last:pb-0 transition-all"
            >
              <div className="mb-2 sm:mb-0">
                <span className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">
                  {article.date}
                </span>
                <h3 className="text-base font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </section>

      {/* --- CTA / FOOTER HERO --- */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-12">
        <div className="relative rounded-xl border border-gray-800/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#111319]/50 to-[#111319]/50 p-12 text-center overflow-hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            I am currently open to freelance opportunities, contract roles, or collaborating on open-source projects.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 bg-[#C7D2FE] hover:bg-white text-neutral-950 font-semibold px-5 py-2.5 rounded-md text-xs transition-colors">
              Send a Message
            </button>
            <a 
              href="mailto:example@domain.com" 
              className="p-2.5 rounded-md border border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-t border-gray-900/60 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-gray-400">SNX Portfolio</span>
          <p className="mt-1">© 2026 SNX Portfolio. Engineered for performance.</p>
        </div>
        
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Github className="w-3 h-3" /> Github
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Linkedin className="w-3 h-3" /> LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Twitter className="w-3 h-3" /> Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <FileText className="w-3 h-3" /> Resume
          </a>
        </div>
      </footer>
    </div>
  );
}
