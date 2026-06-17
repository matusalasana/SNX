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
import FeaturedProjects from "../../components/home/FeaturedProjects"
import Skills from "../../components/home/Skills"
import Experiences from "../../components/home/Experiences"
import RecentBlogs from "../../components/home/RecentBlogs"
import Stats from "../../components/home/Stats"
import CurrentlyWorking from "../../components/home/CurrentlyWorking"


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
    <div className="min-h-screen bg-[#0B0D13] text-[#F3F4F6] font-sans antialiased selection:bg-indigo-500/30 px-3 lg:px-10">

      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experiences />
      <RecentBlogs />
      <Stats />
      <CurrentlyWorking />

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
