import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  ChevronDown,
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  FileText
} from 'lucide-react';
import { Project } from "../../types/projects"
import { useProjects } from "../../hooks/projects/useProjects"

const FILTER_OPTIONS = ["All", "React", "TypeScript", "Node.js", "Rust", "Next.js", "Go"];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { data: projects = [], isLoading, error } = useProjects();
  
  if (error) {
    return <p>Error loading projects</p>;
  }

  if(isLoading){
    return <p>Loading...</p>;
  }
  

  return (
    <div className="min-h-screen bg-[#0B0D13] text-[#F3F4F6] font-sans antialiased selection:bg-indigo-500/30">

      {/* --- HERO / ARCHIVE TITLE --- */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <section className="mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered Solutions / <span className="text-[#A5B4FC]">Selected Works</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            A showcase of high-performance architectural systems, cloud-native platforms, and sophisticated developer tools built for the modern web.
          </p>
        </section>

        {/* --- CONTROLS: SEARCH & FILTERS --- */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Search Input */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111319]/40 border border-gray-800/80 rounded-md pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Filtering Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mr-2">Tech Stack:</span>
            {FILTER_OPTIONS.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  activeFilter === tech
                    ? 'bg-[#312E81]/40 border-indigo-500/60 text-[#C7D2FE]'
                    : 'bg-[#111319]/30 border-gray-800/60 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </section>

        {/* --- WORKS GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col rounded-xl border border-gray-800/50 bg-[#111319]/20 overflow-hidden hover:border-gray-800 transition-all duration-300"
            >
              {/* Image Header wrapper using thumbnailUrl fallback */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319]/40 to-transparent pointer-events-none" />
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#10B981] uppercase">
                      {project.category}
                    </span>
                    
                    {/* Link handling based on presence of liveUrl or githubUrl */}
                    { (project.liveUrl || project.githubUrl) && (
                      <a 
                        href={project.liveUrl ?? project.githubUrl ?? "#"} 
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-white transition-colors" 
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Gracefully handling null text descriptions */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {project.description ?? "No description provided for this architectural asset."}
                  </p>
                </div>

                {/* Tags bottom container */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800/40">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 text-[10px] tracking-wider font-semibold rounded bg-gray-900/60 border border-gray-800/60 text-gray-400 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl">
            <p className="text-gray-500 text-sm">No engineering repositories found matching your current selection.</p>
          </div>
        )}

        {/* --- ACTION: LOAD MORE --- */}
        <section className="flex flex-col items-center justify-center gap-4">
          <button className="inline-flex items-center gap-2 border border-gray-800 hover:border-gray-700 bg-gray-900/20 hover:bg-gray-900/50 text-gray-300 hover:text-white px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-wider transition-all">
            Load More Projects
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          <span className="text-xs text-gray-500 font-light mt-2">
            Showing {projects.length} projects
          </span>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-6xl mx-auto px-6 pt-16 pb-8 border-t border-gray-900/60 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-gray-400">SNX Portfolio</span>
          <p className="mt-1">© 2026 SNX Portfolio. Engineered for performance.</p>
        </div>
        
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Github className="w-3.5 h-3.5" /> Github
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <Twitter className="w-3.5 h-3.5" /> Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Resume
          </a>
        </div>
      </footer>
    </div>
  );
}
