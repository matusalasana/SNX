import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Blog } from '../types';
import {
  Calendar,
  Clock,
  ChevronLeft,
  BookOpen,
  ArrowRight,
  User,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const SingleBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setErrorMsg('');
        const res = await api.get(`/blogs/slug/${slug}`);
        setBlog(res.data);
      } catch (err: any) {
        console.warn('Error fetching individual blog:', err);
        setErrorMsg(err.message || 'The specified article could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col justify-between">
      {loading ? (
        <div className="py-24 text-center space-y-4 animate-pulse">
          <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-500">Retrieving article metadata streams...</p>
        </div>
      ) : errorMsg || !blog ? (
        <div className="py-16 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Article Not Found</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {errorMsg || 'The article you are hunting might have been reverted to a private draft.'}
          </p>
          <Link
            to="/blog"
            className="inline-flex bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-5 py-2 rounded-xl text-xs font-bold"
          >
            Return to Blog Index
          </Link>
        </div>
      ) : (
        <div className="space-y-8 text-left">
          {/* Back Trigger */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Blogs Index</span>
          </Link>

          {/* Article Header metrics */}
          <article className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-500 font-semibold leading-none">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>By Alex SNX</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
                {blog.title}
              </h1>
              
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl italic">
                "{blog.summary}"
              </p>
            </div>

            {blog.thumbnail_url && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-900 max-h-[380px]">
                <img
                  src={blog.thumbnail_url}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Markdown rendering logic */}
            <div className="pt-6 prose prose-invert max-w-none text-slate-300 text-[15px] sm:text-[16px] leading-relaxed space-y-5">
              {blog.content ? (
                blog.content.split('\n').map((line, lidx) => {
                  const trimmed = line.trim();
                  
                  // Simple high-end MD formatting parsing inline
                  if (trimmed.startsWith('### ')) {
                    return <h3 key={lidx} className="text-lg sm:text-xl font-bold text-white pt-4 pb-1">{trimmed.replace('### ', '')}</h3>;
                  }
                  if (trimmed.startsWith('## ')) {
                    return <h2 key={lidx} className="text-xl sm:text-2xl font-bold text-teal-400 pt-5 pb-2">{trimmed.replace('## ', '')}</h2>;
                  }
                  if (trimmed.startsWith('- ')) {
                    return <li key={lidx} className="ml-5 list-disc marker:text-slate-500">{trimmed.replace('- ', '')}</li>;
                  }
                  // Identify simple code snippets inside blogs
                  if (trimmed.startsWith('```')) {
                    if (trimmed === '```sql' || trimmed === '```javascript' || trimmed === '```typescript' || trimmed === '```') {
                      return null; // strip boundaries simple
                    }
                    return <pre key={lidx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 my-4 overflow-x-auto">{trimmed.replace(/```/g, '')}</pre>;
                  }
                  if (line.match(/^\d+\.\s/)) {
                    return <li key={lidx} className="ml-5 list-decimal marker:text-indigo-400">{line.replace(/^\d+\.\s+/, '')}</li>;
                  }
                  if (trimmed.length === 0) return <div key={lidx} className="h-2" />;
                  
                  return <p key={lidx}>{line}</p>;
                })
              ) : (
                <p className="italic text-slate-500">Core blog content body is empty.</p>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
