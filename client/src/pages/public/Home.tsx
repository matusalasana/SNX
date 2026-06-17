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
import ContactCTA from "../../components/home/ContactCTA"


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
      <ContactCTA />


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
