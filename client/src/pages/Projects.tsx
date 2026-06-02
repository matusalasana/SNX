import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { Project } from '../types';
import {
  Search,
  ExternalLink,
  Code,
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  ChevronLeft,
  Settings,
  BookOpen
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Read selected project ID from query params to allow direct linking!
  const projectIdParam = searchParams.get('id');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/projects');
        setProjects(res.data);
        
        // Auto-select if ID is present
        if (projectIdParam) {
          const matched = res.data.find((p: Project) => p.id === projectIdParam);
          if (matched) setActiveProject(matched);
        }
      } catch (err) {
        console.warn('Error fetching projects list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [projectIdParam]);

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    setSearchParams({ id: project.id });
  };

  const handleBackToGrid = () => {
    setActiveProject(null);
    setSearchParams({});
  };

  // Filter projects by query search
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col justify-between">
      {activeProject ? (
        /* PROJECT DETAIL VIEW (Recruiter-friendly technical write-up) */
        <div className="space-y-8 text-left animate-fadeIn">
          {/* Header Back controls */}
          <button
            onClick={handleBackToGrid}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white pb-2 transition-colors outline-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Projects Matrix</span>
          </button>

          <div className="pt-2 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Cover Pillar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-900 shadow-lg">
                <img
                  src={activeProject.thumbnail_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600'}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Build Meta specifications */}
              <div className="p-5 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-4 text-xs">
                <h4 className="font-bold text-slate-400 uppercase tracking-widest pl-0.5">Deployment Coordinates</h4>
                
                <div className="space-y-3.5 font-semibold text-slate-300">
                  {activeProject.github_url && (
                    <a
                      href={activeProject.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-900/65 group transition-all"
                    >
                      <span className="flex items-center gap-2 text-slate-400">
                        <Code className="w-4 h-4 text-slate-500" />
                        <span>Source Code</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400" />
                    </a>
                  )}

                  {activeProject.live_url && (
                    <a
                      href={activeProject.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-900/65 group transition-all"
                    >
                      <span className="flex items-center gap-2 text-slate-400">
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span>Production Demo</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400" />
                    </a>
                  )}
                  
                  <div className="flex items-center justify-between p-2.5 text-slate-400">
                    <span>Repository Authority</span>
                    <span className="font-mono text-teal-400">Main/Public</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Markdown docs and summaries */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-slate-900/20 border border-slate-900 rounded-3xl space-y-6">
              <div className="space-y-3 pb-5 border-b border-slate-900">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Technical Documentation & Execution</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {activeProject.title}
                </h1>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Core markdown contents */}
              <div className="prose prose-invert max-w-none text-slate-300 text-[15px] leading-relaxed space-y-4">
                {activeProject.content ? (
                  activeProject.content.split('\n').map((line, lidx) => {
                    if (line.trim().startsWith('### ')) {
                      return <h3 key={lidx} className="text-lg font-bold text-white pt-3">{line.replace('### ', '')}</h3>;
                    }
                    if (line.trim().startsWith('#### ')) {
                      return <h4 key={lidx} className="text-base font-bold text-indigo-300 pt-2">{line.replace('#### ', '')}</h4>;
                    }
                    if (line.trim().startsWith('- ')) {
                      return <li key={lidx} className="ml-4 list-disc marker:text-slate-500">{line.replace('- ', '')}</li>;
                    }
                    if (line.trim().length === 0) return <div key={lidx} className="h-2" />;
                    return <p key={lidx}>{line}</p>;
                  })
                ) : (
                  <p className="text-slate-500 italic">No in-depth writeup provided for this project build yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PROJECTS MATRIX GRID */
        <div className="space-y-10 text-left">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-teal-400">Bento Index</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              Web Products & Builds
            </h1>
            <p className="text-sm text-slate-400 max-w-xl font-normal leading-relaxed">
              Explore custom systems I've deployed, complete with API specs, backend architectures, and production logs.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="max-w-md relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Filter product matrix by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-900 rounded-2xl pl-12 pr-4 py-3 text-[14px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 rounded-2xl bg-slate-900/50 animate-pulse border border-slate-900" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/10 border border-slate-900 rounded-2xl max-w-xl mx-auto space-y-2">
              <Settings className="w-8 h-8 text-slate-500 animate-spin mx-auto pb-1" />
              <h3 className="font-bold text-slate-300">No Projects Found</h3>
              <p className="text-xs text-slate-500">No active portfolio records match your current coordinate bounds.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj)}
                  className="bg-slate-900/30 hover:bg-slate-900/60 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between text-left group transition-all duration-200 cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={proj.thumbnail_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600'}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-lg text-white group-hover:text-teal-400 transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-2 text-xs font-bold uppercase tracking-wider text-teal-400 group-hover:text-white transition-colors flex items-center gap-1.5">
                      <span>Inspect Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
