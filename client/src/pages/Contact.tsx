import React, { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { z } from 'zod';
import {
  Send,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Sparkles,
  ClipboardCheck,
  Building
} from 'lucide-react';

// Contact Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid recruiter email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  message: z.string().min(5, 'Message text must be at least 5 characters long')
});

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side Zod validation
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const formatted: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formatted[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(formatted);
      toast.error('Please verify information fields correctly.');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post('/messages', formData);
      toast.success('Your message was successfully logged directly to Postgres!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Connecting to database pipe failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
        {/* Left Informational Block */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-teal-400">Pipes Ingress</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              Get In Touch
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Recruiting for an opening? Want to brainstorm an architecture or verify consultant packages? Write me a direct connection signal.
            </p>
          </div>

          {/* Core metadata badges */}
          <div className="space-y-4 font-semibold text-xs text-slate-300">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-900">
              <Mail className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-500 font-bold block uppercase tracking-widest text-[9px]">Administrative Email</span>
                <span className="font-mono text-slate-300">alex@snx.dev</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-900">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-500 font-bold block uppercase tracking-widest text-[9px]">Headquarters Base</span>
                <span>London, United Kingdom</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-900">
              <Building className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-500 font-bold block uppercase tracking-widest text-[9px]">Openness</span>
                <span className="text-teal-400">Full stack staff roles (Hybrid/Remote)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono pl-1">
            <a href="https://github.com" className="text-slate-500 hover:text-white transition-colors">GitHub</a>
            <span>&bull;</span>
            <a href="https://linkedin.com" className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* Right Input Form */}
        <div className="lg:col-span-7 bg-slate-900/20 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-900">
            <span className="font-bold text-sm text-white">Direct Message Panel</span>
            <div className="flex items-center gap-1.5 text-[10px] text-teal-300 bg-teal-500/5 px-2.5 py-1 rounded border border-teal-500/10 font-bold font-mono">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>DATA ENCRYPTION ON</span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sandra Thompson"
                  className={`w-full bg-slate-950/60 border ${
                    errors.name ? 'border-rose-500' : 'border-slate-900'
                  } rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800`}
                />
                {errors.name && <span className="text-[10px] font-semibold text-rose-400 pl-1">{errors.name}</span>}
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sandra@techrecruitment.com"
                  className={`w-full bg-slate-950/60 border ${
                    errors.email ? 'border-rose-500' : 'border-slate-900'
                  } rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800`}
                />
                {errors.email && <span className="text-[10px] font-semibold text-rose-400 pl-1">{errors.email}</span>}
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Subject Coordinates</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Database Lead role at prism core"
                className={`w-full bg-slate-950/60 border ${
                  errors.subject ? 'border-rose-500' : 'border-slate-900'
                } rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800`}
              />
              {errors.subject && <span className="text-[10px] font-semibold text-rose-400 pl-1">{errors.subject}</span>}
            </div>

            {/* Message field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Message Text Outline</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly detail resource profiles, parameters, and timebounds..."
                className={`w-full bg-slate-950/60 border ${
                  errors.message ? 'border-rose-500' : 'border-slate-900'
                } rounded-xl p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 resize-none`}
              />
              {errors.message && <span className="text-[10px] font-semibold text-rose-400 pl-1">{errors.message}</span>}
            </div>

            {/* Request Trigger */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-tr from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 border border-transparent disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 group transition-all select-none cursor-pointer"
            >
              {isSubmitting ? (
                <span>Writing message lines...</span>
              ) : (
                <>
                  <span>Deploy Message to SNX</span>
                  <Send className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
