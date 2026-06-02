import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Terminal,
  LogOut,
  FolderOpen,
  BookOpen,
  Code2,
  Mail,
  User,
  Menu,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout, isMockMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { path: '/projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
    { path: '/blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-teal-500/30 selection:text-teal-200">
      {/* Absolute Dynamic Abstract Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      {/* Demo Warning Bar */}
      {isMockMode && (
        <div className="bg-gradient-to-r from-indigo-950 via-teal-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-2 text-center text-xs font-mono tracking-wide text-teal-300 z-50 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse text-teal-400" />
          <span>Interactive Demo Enabled! Running safely with live in-memory local state.</span>
          <a
            href="#schema-section"
            onClick={(e) => {
              e.preventDefault();
              alert("See '/schema.sql' for the full Neon Postgres SQL definition! Introduce a custom DATABASE_URL environment secret via Settings to lock in real persistence.");
            }}
            className="underline hover:text-white capitalize ml-2.5 font-bold"
          >
            learn more
          </a>
        </div>
      )}

      {/* Header Panel */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 p-[1.5px] group-hover:rotate-6 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 tracking-tighter">SNX</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-base tracking-wider text-white">SNX.dev</span>
              <span className="text-[10px] text-teal-400 font-mono block leading-none">PERN PORTFOLIO</span>
            </div>
          </Link>

          {/* Large Screen Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-teal-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Toolbar / CTA Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Flyout */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold tracking-wide py-1.5 px-3 rounded-lg flex items-center gap-3 ${
                      isActive ? 'bg-teal-500/10 text-teal-400' : 'text-slate-400'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-900 flex flex-col gap-3.5">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full justify-center bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest text-center flex items-center gap-1.5"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>ADMIN PANEL</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-slate-500 hover:text-rose-400 transition-colors py-2 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>LOGOUT</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-slate-900 text-center border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest"
                >
                  ADMIN LOGIN
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Primary Content Viewport */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer Panel */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-extrabold text-lg text-white font-mono uppercase tracking-tighter">SNX.dev</span>
            <p className="text-xs text-slate-500 mt-1.5">
              Designed as a modern recruiter-friendly developer portal. Crafted with real PERN.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
            <span>&copy; {new Date().getFullYear()} SNX Portfolio. All rights reserved.</span>
            <span>&bull;</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">Github</a>
            <span>&bull;</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
