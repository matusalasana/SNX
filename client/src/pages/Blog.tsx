import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Blog } from '../types';
import {
  Calendar,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.warn('Error querying public blogs list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    return b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col justify-between">
      <div className="space-y-10 text-left">
        <div className="space-y-3">
          <span className="text-xs font-bold font-mono tracking-widest uppercase text-teal-400">Chronicles</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            Technical Writeups
          </h1>
          <p className="text-sm text-slate-400 max-w-xl font-normal leading-relaxed">
            Personal lessons, language deep-dives, systems optimization guides, and structural notes compiled live.
          </p>
        </div>

        {/* Filters */}
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search blogs by keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-900 rounded-2xl pl-12 pr-4 py-3 text-[14px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          />
        </div>

        {loading ? (
          <div className="space-y-5">
            {[1, 2].map((n) => (
              <div key={n} className="h-44 bg-slate-900/40 border border-slate-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/10 border border-slate-900 rounded-2xl max-w-lg mx-auto space-y-2">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto pb-1" />
            <h3 className="font-bold text-slate-300">No Articles Found</h3>
            <p className="text-xs text-slate-500">Simplify query terms to widen search sweeps.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="p-6 sm:p-8 bg-slate-900/30 hover:bg-slate-900/60 border border-slate-900 hover:border-slate-800 rounded-2xl flex flex-col sm:flex-row gap-6 text-left group transition-all duration-150"
              >
                {post.thumbnail_url && (
                  <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-900 shrink-0">
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                    />
                  </div>
                )}
                
                <div className="flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold leading-none">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-teal-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400 group-hover:text-white transition-colors flex items-center gap-1 justify-end">
                    <span>Read Full Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
