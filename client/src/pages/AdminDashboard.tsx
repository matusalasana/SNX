import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Project, Blog, Skill, Experience, ContactMessage } from '../types';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  Award,
  PlusCircle,
  Trash2,
  CheckCircle,
  Eye,
  LogOut,
  Edit,
  Save,
  Check,
  EyeOff,
  AlertTriangle,
  NotebookTabs,
  Undo2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'blogs' | 'skills' | 'messages'>('analytics');
  
  // Dashboard states
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms state controls
  const [isNewProjectMode, setIsNewProjectMode] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    content: '',
    thumbnail_url: '',
    github_url: '',
    live_url: '',
    order_index: 0
  });

  const [isNewBlogMode, setIsNewBlogMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    thumbnail_url: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'frontend' as any,
    proficiency: 90,
    icon_name: 'Code'
  });

  const [experienceForm, setExperienceForm] = useState({
    company: '',
    role: '',
    description: '',
    duration: ''
  });

  // Fetch all administration resources
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [projRes, blogRes, skillRes, expRes, msgRes] = await Promise.all([
        api.get('/projects'),
        api.get('/blogs?admin=true'),
        api.get('/skills'),
        api.get('/experiences'),
        api.get('/messages')
      ]);
      setProjects(projRes.data);
      setBlogs(blogRes.data);
      setSkills(skillRes.data);
      setExperiences(expRes.data);
      setMessages(msgRes.data);
    } catch (err: any) {
      toast.error('Session authentication expired or database rejected query.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ---------------- PROJECT ACTIONS ----------------
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProjectId) {
        const res = await api.put(`/projects/${editingProjectId}`, projectForm);
        setProjects(projects.map((p) => (p.id === editingProjectId ? res.data : p)));
        toast.success('Project updated on Neon successfully!');
      } else {
        const res = await api.post('/projects', projectForm);
        setProjects([...projects, res.data]);
        toast.success('New Project launched successfully!');
      }
      resetProjectForm();
    } catch (err: any) {
      toast.error(err.message || 'Validation or database constraints failed.');
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      content: '',
      thumbnail_url: '',
      github_url: '',
      live_url: '',
      order_index: 0
    });
    setEditingProjectId(null);
    setIsNewProjectMode(false);
  };

  const handleEditProject = (p: Project) => {
    setProjectForm({
      title: p.title,
      description: p.description,
      content: p.content,
      thumbnail_url: p.thumbnail_url || '',
      github_url: p.github_url || '',
      live_url: p.live_url || '',
      order_index: p.order_index || 0
    });
    setEditingProjectId(p.id);
    setIsNewProjectMode(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
      toast.success('Project removed from portfolio index.');
    } catch (err: any) {
      toast.error(err.message || 'Deletion failed.');
    }
  };

  // ---------------- BLOG ACTIONS ----------------
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBlogId) {
        const res = await api.put(`/blogs/${editingBlogId}`, blogForm);
        setBlogs(blogs.map((b) => (b.id === editingBlogId ? res.data : b)));
        toast.success('Post edited successfully!');
      } else {
        const res = await api.post('/blogs', blogForm);
        setBlogs([...blogs, res.data]);
        toast.success('Blog publication created!');
      }
      resetBlogForm();
    } catch (err: any) {
      toast.error(err.message || 'Process error: Duplicate slug or missing attributes');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      slug: '',
      summary: '',
      content: '',
      thumbnail_url: '',
      status: 'draft'
    });
    setEditingBlogId(null);
    setIsNewBlogMode(false);
  };

  const handleEditBlog = (b: Blog) => {
    setBlogForm({
      title: b.title,
      slug: b.slug,
      summary: b.summary,
      content: b.content,
      thumbnail_url: b.thumbnail_url || '',
      status: b.status
    });
    setEditingBlogId(b.id);
    setIsNewBlogMode(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Erase blog post permanently?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success('Article scrubbed from records.');
    } catch (err: any) {
      toast.error(err.message || 'Scrub failed.');
    }
  };

  // ---------------- SKILL ACTIONS ----------------
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/skills', skillForm);
      setSkills([...skills, res.data]);
      setSkillForm({ name: '', category: 'frontend', proficiency: 90, icon_name: 'Code' });
      toast.success('Added badge competency');
    } catch (err: any) {
      toast.error(err.message || 'Competency error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((sk) => sk.id !== id));
      toast.success('Erase success.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ---------------- EXPERIENCE ACTIONS ----------------
  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/experiences', experienceForm);
      setExperiences([...experiences, res.data]);
      setExperienceForm({ company: '', role: '', description: '', duration: '' });
      toast.success('Chronicled work history item!');
    } catch (err: any) {
      toast.error(err.message || 'Database insert error');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await api.delete(`/experiences/${id}`);
      setExperiences(experiences.filter((exp) => exp.id !== id));
      toast.success('Experience chronicle deleted.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ---------------- MESSAGE ACTIONS ----------------
  const handleToggleRead = async (msg: ContactMessage) => {
    try {
      const res = await api.put(`/messages/${msg.id}/read`, { is_read: !msg.is_read });
      setMessages(messages.map((m) => (m.id === msg.id ? res.data : m)));
      toast.success(msg.is_read ? 'Marked as unread' : 'Marked as processed');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
      toast.success('Inquiry trashed.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-sm font-mono text-slate-500 max-w-7xl mx-auto flex-grow flex flex-col justify-center gap-2">
        <LayoutDashboard className="w-8 h-8 text-indigo-400 animate-spin mx-auto pb-1" />
        <span>Synchronizing administrative credentials...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch">
        
        {/* SIDE BAR NAVIGATION TABS */}
        <aside className="lg:col-span-3 flex flex-row lg:flex-col lg:space-y-2 gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 h-fit bg-slate-900/10 p-3 rounded-2xl border border-slate-900 border-none">
          <button
            onClick={() => { setActiveTab('analytics'); resetProjectForm(); resetBlogForm(); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 select-none ${
              activeTab === 'analytics' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Overview Stats</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); resetBlogForm(); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 select-none ${
              activeTab === 'projects' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4 shrink-0" />
            <span>Manage Projects</span>
          </button>

          <button
            onClick={() => { setActiveTab('blogs'); resetProjectForm(); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 select-none ${
              activeTab === 'blogs' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Manage Blog</span>
          </button>

          <button
            onClick={() => { setActiveTab('skills'); resetBlogForm(); resetProjectForm(); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 select-none ${
              activeTab === 'skills' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>Skills & Work</span>
          </button>

          <button
            onClick={() => { setActiveTab('messages'); resetBlogForm(); resetProjectForm(); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 select-none ${
              activeTab === 'messages' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Inquiry Inbox</span>
            {messages.filter((m) => !m.is_read).length > 0 && (
              <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-500/20" />
            )}
          </button>
        </aside>

        {/* PRIMARY VIEW PANEL */}
        <main className="lg:col-span-9 p-6 sm:p-8 bg-slate-900/10 border border-slate-900 rounded-3xl min-h-[480px] flex flex-col justify-between">
          
          {/* TAB 1: OVERVIEW STATS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">Platform Infrastructure Analytics</h1>
                <p className="text-xs text-slate-500">Live operational coordinates tracked in server models.</p>
              </div>

              {/* Statistics grid badges */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none pb-1.5">Projects Matrix</span>
                  <span className="text-2xl font-extrabold text-white">{projects.length}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none pb-1.5">Blog Articles</span>
                  <span className="text-2xl font-extrabold text-teal-400">{blogs.length}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none pb-1.5">Registered Badges</span>
                  <span className="text-2xl font-extrabold text-indigo-400">{skills.length}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none pb-1.5">Pending Messages</span>
                  <span className="text-2xl font-extrabold text-rose-400">{messages.filter(m => !m.is_read).length}</span>
                </div>
              </div>

              {/* Server check block */}
              <div className="p-5 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-3">
                <h4 className="font-bold text-xs text-slate-300">Live Server Parameters</h4>
                <div className="space-y-2 font-mono text-[11px] text-slate-400">
                  <p>Database Provider: <span className="text-teal-400">Neon API SQL Cluster V4</span></p>
                  <p>Checkpoints State: <span className="text-teal-400 font-bold">&bull; COMPLETED</span></p>
                  <p>JWT Signature Cipher: <span className="text-indigo-400">HMAC-SHA256 (7d expiry)</span></p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS PANELS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                <div>
                  <h1 className="font-extrabold text-lg sm:text-xl text-white">Web Products Manager</h1>
                  <p className="text-[11px] text-slate-500 leading-none mt-1">Configure grid indexes and detailed metadata docs.</p>
                </div>
                {!isNewProjectMode && (
                  <button
                    onClick={() => { resetProjectForm(); setIsNewProjectMode(true); }}
                    className="bg-teal-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create New</span>
                  </button>
                )}
              </div>

              {isNewProjectMode ? (
                /* Form layout */
                <form onSubmit={handleProjectSubmit} className="space-y-4 max-w-2xl bg-slate-950/30 p-5 rounded-2xl border border-slate-900">
                  <h3 className="font-bold text-xs text-indigo-300 uppercase pl-0.5">{editingProjectId ? 'Adjust Project' : 'Deploy New Project'}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="My Dynamic Aggregator"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Grid Order Index</label>
                      <input
                        type="number"
                        value={projectForm.order_index}
                        onChange={(e) => setProjectForm({ ...projectForm, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Brief Summary Pitch</label>
                    <input
                      type="text"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Brief single-sentence deck pitch..."
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Thumbnail Cover Link</label>
                      <input
                        type="text"
                        value={projectForm.thumbnail_url}
                        onChange={(e) => setProjectForm({ ...projectForm, thumbnail_url: e.target.value })}
                        placeholder="Image URL"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">GitHub Source Link</label>
                      <input
                        type="text"
                        value={projectForm.github_url}
                        onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Live Site Demo Link</label>
                      <input
                        type="text"
                        value={projectForm.live_url}
                        onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Comprehensive technical writeup markdown area */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold block">Detailed Markdown System Specifications</label>
                    <textarea
                      rows={6}
                      value={projectForm.content}
                      onChange={(e) => setProjectForm({ ...projectForm, content: e.target.value })}
                      placeholder="### Structural Deep-Dive&#10;&#10;- Element index A&#10;- Technical coordinates B&#10;&#10;Explain algorithms, DB design patterns..."
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-200 resize-none font-mono"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-teal-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Commit Deployment</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="bg-slate-900 border border-slate-800 text-slate-400 px-5 py-2.5 rounded-xl text-xs font-medium cursor-pointer"
                    >
                      Cancel Setup
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List Grid */
                <div className="space-y-3">
                  {projects.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No products registered yet. Click Create New above!</p>
                  ) : (
                    <div className="space-y-2.5">
                      {projects.map((p) => (
                        <div key={p.id} className="flex justify-between items-center p-4 bg-slate-950/40 border border-slate-900 rounded-xl text-xs">
                          <div>
                            <span className="font-extrabold text-white text-sm">{p.title}</span>
                            <p className="text-slate-500 italic font-mono mt-0.5">Order index: {p.order_index} &bull; ID: {p.id.substring(0, 8)}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditProject(p)}
                              className="p-2 bg-slate-900 rounded-lg hover:text-teal-400 text-slate-400 border border-slate-800 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 bg-slate-900 rounded-lg hover:text-rose-400 text-slate-400 border border-slate-800 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                <div>
                  <h1 className="font-extrabold text-lg sm:text-xl text-white">Articles Broadcaster</h1>
                  <p className="text-[11px] text-slate-500 leading-none mt-1">Publish writeups, draft journals, and update slug routes.</p>
                </div>
                {!isNewBlogMode && (
                  <button
                    onClick={() => { resetBlogForm(); setIsNewBlogMode(true); }}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                )}
              </div>

              {isNewBlogMode ? (
                /* New Post form contains a split-pane interactive Live Markdown Previewer! Excellent! */
                <form onSubmit={handleBlogSubmit} className="space-y-4 bg-slate-950/30 p-5 rounded-2xl border border-slate-900">
                  <h3 className="font-bold text-xs text-indigo-300 uppercase pl-0.5">{editingBlogId ? 'Edit Article Draft' : 'Launch Draft Writeup'}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Title</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => {
                          const slg = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setBlogForm({ ...blogForm, title: e.target.value, slug: slg });
                        }}
                        placeholder="My scaling coordinates"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">URL Slug Mapping</label>
                      <input
                        type="text"
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                        placeholder="my-scaling-coordinates"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Index Cover Image Link</label>
                      <input
                        type="text"
                        value={blogForm.thumbnail_url}
                        onChange={(e) => setBlogForm({ ...blogForm, thumbnail_url: e.target.value })}
                        placeholder="https://unsplash..."
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold block">Broadcast Mode</label>
                      <select
                        value={blogForm.status}
                        onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-teal-400 font-bold"
                      >
                        <option value="draft">📁 Saved Draft</option>
                        <option value="published">🌐 Live Broadcast</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Underline deck summary deck</label>
                    <input
                      type="text"
                      value={blogForm.summary}
                      onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                      placeholder="Brief metadata synopsis outline..."
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  {/* Split Pane - Input Text editor next to real time rendering! */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs text-indigo-300 font-semibold">Written Markdown Editor</label>
                      <textarea
                        rows={8}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Hello. Use headers:&#10;## Subheading&#10;- Points bullet&#10;&#10;Write with raw eloquence."
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-200 font-mono resize-none focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs text-indigo-300 font-semibold">Live Compiler Preview</label>
                      <div className="w-full h-[155px] overflow-y-auto bg-slate-950/70 p-3.5 border border-slate-900 rounded-xl text-slate-400 font-normal text-xs leading-relaxed space-y-2">
                        {blogForm.content ? (
                          blogForm.content.split('\n').map((line, ix) => {
                            if (line.trim().startsWith('## ')) {
                              return <h3 key={ix} className="text-xs font-bold text-teal-400">{line.replace('## ', '')}</h3>;
                            }
                            if (line.trim().startsWith('- ')) {
                              return <li key={ix} className="ml-3 list-disc text-[11px]">{line.replace('- ', '')}</li>;
                            }
                            return <p key={ix}>{line}</p>;
                          })
                        ) : (
                          <span className="italic text-slate-700">Awaiting input triggers...</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Commit Publication</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="bg-slate-900 border border-slate-800 text-slate-400 px-5 py-2.5 rounded-xl text-xs cursor-pointer font-semibold"
                    >
                      Dismiss Draft
                    </button>
                  </div>
                </form>
              ) : (
                /* Blogs List Grid */
                <div className="space-y-3">
                  {blogs.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Zero publications launched. Click Create Article above!</p>
                  ) : (
                    <div className="space-y-2.5">
                      {blogs.map((b) => (
                        <div key={b.id} className="flex justify-between items-center p-4 bg-slate-950/40 border border-slate-900 rounded-xl text-xs">
                          <div>
                            <span className="font-extrabold text-white text-sm">{b.title}</span>
                            <div className="flex items-center gap-2 mt-0.5 leading-none">
                              {b.status === 'published' ? (
                                <span className="text-[10px] text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded font-bold font-mono">LIVE PUBLISHED</span>
                              ) : (
                                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-bold font-mono">📁 PRIVATE DRAFT</span>
                              )}
                              <span className="text-slate-600 font-mono">/{b.slug}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditBlog(b)}
                              className="p-2 bg-slate-900 rounded-lg hover:text-teal-400 text-slate-400 border border-slate-800 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-2 bg-slate-900 rounded-lg hover:text-rose-400 text-slate-400 border border-slate-800 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS & WORK HISTORY */}
          {activeTab === 'skills' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Part 4.1: SKILLS ADDER */}
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-900">
                  <h1 className="font-extrabold text-lg sm:text-xl text-white">Interactive Expertise Badges</h1>
                  <p className="text-[11px] text-slate-500 mt-1">Insert category chips and proficiency score sliders.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* form */}
                  <form onSubmit={handleSkillSubmit} className="md:col-span-5 p-4 bg-slate-950/20 border border-slate-900 rounded-2xl text-left space-y-3">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest pl-0.5">Add Skill Module</h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Skill Name</label>
                      <input
                        type="text"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        placeholder="e.g. Docker"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Category Bracket</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white"
                      >
                        <option value="languages">Languages</option>
                        <option value="frontend">Frontend Web</option>
                        <option value="backend">Backend & APIs</option>
                        <option value="devops">Devops & Cloud</option>
                        <option value="others">Other Competences</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                        <span>Proficiency Range</span>
                        <span className="text-teal-400">{skillForm.proficiency}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={skillForm.proficiency}
                        onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) || 50 })}
                        className="w-full accent-teal-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-500 text-slate-950 py-2 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer"
                    >
                      Add Badge Record
                    </button>
                  </form>

                  {/* chips lists */}
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 pl-1">Active Competency Badges ({skills.length})</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {skills.map((sk) => (
                        <div
                          key={sk.id}
                          className="px-3 py-1.5 bg-slate-950/60 border border-slate-900 rounded-xl text-xs flex items-center justify-between gap-3 text-slate-300 font-semibold"
                        >
                          <div>
                            <span className="text-white text-[12px]">{sk.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono block leading-none select-none lowercase italic">{sk.category}</span>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteSkill(sk.id)}
                            className="text-slate-600 hover:text-rose-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 4.2: EXPERIENCES LISTS */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="pb-1">
                  <h4 className="font-bold text-white text-base">History Chronicles Timeline</h4>
                  <p className="text-[11px] text-slate-500">Document company name roles and historical duration.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* form */}
                  <form onSubmit={handleExperienceSubmit} className="md:col-span-5 p-4 bg-slate-950/20 border border-slate-900 rounded-2xl space-y-3">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase pl-0.5">Add Timeline Block</h3>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Company</label>
                        <input
                          type="text"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          placeholder="Nova Corp"
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Duration Range</label>
                        <input
                          type="text"
                          value={experienceForm.duration}
                          onChange={(e) => setExperienceForm({ ...experienceForm, duration: e.target.value })}
                          placeholder="Jan 2024 - Present"
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Interactive Role Title</label>
                      <input
                        type="text"
                        value={experienceForm.role}
                        onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                        placeholder="Principal Architect"
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Responsible Details</label>
                      <textarea
                        rows={3}
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                        placeholder="Designed robust postgres raw transaction pools..."
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-slate-200 resize-none font-sans leading-relaxed"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-500 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Chronic Timeline
                    </button>
                  </form>

                  {/* List timeline rows */}
                  <div className="md:col-span-7 space-y-3.5">
                    <h3 className="text-xs font-bold text-slate-400 pl-1">Scribed Timelines ({experiences.length})</h3>
                    
                    <div className="space-y-2">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl relative text-xs">
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="absolute right-4 top-4 hover:text-rose-500 text-slate-600 transition-colors p-1 rounded-lg border border-slate-900/40 bg-slate-950"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="space-y-1 shrink-1 max-w-[85%]">
                            <span className="font-extrabold text-white text-sm block leading-none">{exp.role}</span>
                            <span className="text-xs font-semibold text-indigo-400 block leading-normal">{exp.company} &bull; <span className="font-mono text-slate-600">{exp.duration}</span></span>
                            <p className="text-slate-500 leading-normal font-normal text-[11px] pt-1">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-3 border-b border-slate-900">
                <h1 className="font-extrabold text-lg sm:text-xl text-white">Recruiter Mail Inbox ({messages.length})</h1>
                <p className="text-[11px] text-slate-500 mt-1">Inspect incoming correspondence parameters loaded from PG.</p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center bg-slate-950/40 border border-slate-900 rounded-2xl max-w-md mx-auto space-y-1">
                  <Mail className="w-6 h-6 text-slate-600 mx-auto" />
                  <p className="font-bold text-slate-400 text-xs">Inbox Cleared</p>
                  <p className="text-[10px] text-slate-600">No active correspondence records match index buffers.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-5 rounded-2xl border text-xs text-left transition-all ${
                        m.is_read
                          ? 'bg-slate-950/20 border-slate-900/60 text-slate-400 opacity-75'
                          : 'bg-slate-950/80 border-indigo-500/20 text-slate-100 shadow-md'
                      } space-y-3`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-900 pb-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold sm:text-sm text-white">{m.name}</span>
                            <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0 uppercase">{m.email}</span>
                          </div>
                          <span className="font-bold text-indigo-400 block pt-0.5">Subject: {m.subject}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleToggleRead(m)}
                            className="px-2.5 py-1.5 font-bold uppercase tracking-widest bg-slate-900/60 border border-slate-800 hover:text-teal-400 text-slate-500 rounded-lg text-[9px] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            {m.is_read ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-teal-400" />}
                            <span>{m.is_read ? 'Mark Unread' : 'Mark Read'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="p-1.5 bg-slate-900 hover:text-rose-500 text-slate-600 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content block of inquiry */}
                      <p className="leading-relaxed font-normal text-slate-300 text-[12px] whitespace-pre-wrap pl-0.5">
                        {m.message}
                      </p>

                      <span className="block text-[10px] font-mono text-slate-600 leading-none pt-1">
                        Received on Postgress channel at: {new Date(m.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
