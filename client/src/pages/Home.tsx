import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Project, Skill, Experience, Blog } from '../types';
import {
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Terminal,
  Bookmark,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Linkedin,
  Github,
  Mail,
  Infinity as LoopIcon
} from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [projRes, skillRes, blogRes, expRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/blogs'),
          api.get('/experiences')
        ]);
        setProjects(projRes.data.slice(0, 3)); // show top 3 projects
        setSkills(skillRes.data);
        setBlogPosts(blogRes.data.slice(0, 2)); // show top 2 published blogs
        setExperiences(expRes.data);
      } catch (err) {
        console.warn('Error fetching portfolio landing data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Map icon name string to Lucide component
  const getSkillIcon = (name: string) => {
    const cls = "w-5 h-5";
    switch (name?.toLowerCase()) {
      case 'code': return <Code2 className={`${cls} text-teal-400`} />;
      case 'layers': return <Layers className={`${cls} text-indigo-400`} />;
      case 'cpu': return <Cpu className={`${cls} text-amber-400`} />;
      case 'database': return <Database className={`${cls} text-emerald-400`} />;
      case 'terminal': return <Terminal className={`${cls} text-cyan-400`} />;
      default: return <Code2 className={`${cls} text-teal-400`} />;
    }
  };

  const categories = {
    languages: 'Languages',
    frontend: 'Frontend Web',
    backend: 'Backend & APIs',
    devops: 'Devops & Cloud',
    others: 'Other Competences'
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO HERO SECTION */}
      <section className="relative pt-20 md:pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-300">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Open to Full-Time Roles & Free Consults</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-indigo-500">Alex SNX</span>.
              <br />A Full-Stack Developer.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-normal">
              I compose robust web databases, write beautifully functional client applications, and construct optimized API pipelines. Explore my verified products and writeups.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/projects"
                className="bg-gradient-to-tr from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-teal-500/10 hover:-translate-y-0.5 transition-all outline-none"
              >
                <span>Inspect Projects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                to="/contact"
                className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-6 py-3.5 rounded-2xl text-sm transition-all text-center flex items-center justify-center"
              >
                Let's Converse
              </Link>
              <a
                href="#download-resume"
                onClick={(e) => {
                  e.preventDefault();
                  alert("SNX_Developer_Resume_MVP.pdf downloaded successfully (interactive simulation).");
                }}
                className="text-slate-400 hover:text-teal-400 text-xs font-mono flex items-center gap-1.5 ml-1 inline-flex py-2 select-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-3.5 pt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:admin@snx.com" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Isometric Bento Block Mockup */}
          <div className="lg:col-span-5 h-[340px] relative hidden lg:block">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-3xl bg-gradient-to-tr from-indigo-500 to-indigo-600 rotate-12 blur-[60px] opacity-25" />
            
            <div className="w-full h-full bg-slate-900/40 border border-slate-900 rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden shadow-inner backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-400/10 font-bold">NODE_SERVER_ACTIVE</span>
              </div>

              <div className="space-y-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-900 text-left font-mono text-xs text-slate-400">
                <p className="text-teal-400 font-bold">alex@snx-studio % npm run stats</p>
                <p className="text-slate-500">// Fetching raw DB statistics...</p>
                <p>Host: <span className="text-white">Neon PostgreSQL Serverless</span></p>
                <p>Status: <span className="text-emerald-400 font-semibold">&bull; Online</span></p>
                <p>Response Latency: <span className="text-teal-400">12ms</span></p>
              </div>

              <div className="text-left text-xs font-semibold text-slate-500 flex justify-between items-center px-1">
                <span>API Router Engine</span>
                <span className="text-teal-400 font-mono">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECHNICAL EXPERTISE SKILLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-900/10 border-y border-slate-900/70">
        <div className="space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-teal-400">Core Expertise</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Advanced Technical Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categories).map(([key, title]) => {
              const matchedSkills = skills.filter((s) => s.category === key);
              if (matchedSkills.length === 0) return null;
              return (
                <div key={key} className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl text-left space-y-4">
                  <h3 className="text-sm font-bold tracking-wide text-indigo-300 uppercase flex items-center gap-1.5">
                    {key === 'languages' ? <Terminal className="w-4' h-4 text-indigo-400" /> : <Code2 className="w-4 h-4 text-teal-400" />}
                    <span>{title}</span>
                  </h3>
                  
                  <div className="space-y-3.5">
                    {matchedSkills.map((sk) => (
                      <div key={sk.id} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-slate-300">{sk.name}</span>
                          <span className="text-teal-400 font-mono text-[11px] font-bold">{sk.proficiency}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div
                            style={{ width: `${sk.proficiency}%` }}
                            className="bg-gradient-to-r from-teal-500 to-indigo-500 h-1.5 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE TOP PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-bold font-mono tracking-widest uppercase text-indigo-400">Featured Builds</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Engineered For Production</h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-bold tracking-wider text-teal-400 hover:text-white uppercase flex items-center gap-1 inline-flex pt-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-900" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between text-left group hover:border-slate-800 transition-all duration-200"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={proj.thumbnail_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600'}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-lg text-white group-hover:text-teal-400 transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <Link
                      to={`/projects?id=${proj.id}`}
                      className="mt-2 text-xs font-bold uppercase tracking-wider text-teal-400 group-hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Explore Technical Docs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CHRONICLED TIMELINE WORK EXPERIENCE */}
      <section className="bg-slate-900/5 py-16 border-y border-slate-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-teal-400">Professional History</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Experience Timeline</h2>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-slate-900/60 rounded-xl" />
              <div className="h-20 bg-slate-900/40 rounded-xl" />
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8 text-left">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative space-y-2">
                  {/* Bullet */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-teal-400" />
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 shrink-0 select-none">
                      {exp.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-indigo-400">{exp.company}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. PUBLIC BLOG FEED PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="text-left space-y-2">
              <span className="text-xs font-bold font-mono tracking-widest uppercase text-indigo-400">Written Chronicling</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Developer Blog Publications</h2>
            </div>
            <Link
              to="/blog"
              className="text-sm font-bold tracking-wider text-teal-400 hover:text-white uppercase flex items-center gap-1 inline-flex pt-1"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="p-6 bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl flex flex-col justify-between text-left group transition-all duration-150"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</span>
                    </div>
                    <span>&bull;</span>
                    <span className="text-teal-400 bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/10 font-mono text-[10px]">ARTICLE</span>
                  </div>
                  
                  <h3 className="font-extrabold text-lg text-white group-hover:text-teal-400 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-2">
                    {blog.summary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-white">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
