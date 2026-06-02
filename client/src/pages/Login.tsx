import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Fields username and password cannot be empty.');
      return;
    }

    try {
      setIsLoggingIn(true);
      await login(username, password);
      toast.success('Authenticated: Session opened.');
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.message || 'Verification rejected.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleApplyDefaults = () => {
    setUsername('admin');
    setPassword('admin123');
    toast.success('Mock coordinates loaded. Press Submit.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 flex-grow flex flex-col justify-center">
      <div className="p-6 sm:p-8 bg-slate-900/30 border border-slate-900 rounded-3xl text-left space-y-6 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 to-indigo-500" />
        
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>Admin Gateway</span>
          </h1>
          <p className="text-xs text-slate-400 leading-normal font-normal">
            Authenticate to modify active blog publications, technical projects, or review recruiter correspondence metrics.
          </p>
        </div>

        {/* Informational Help Box */}
        <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] text-indigo-300 leading-relaxed font-semibold flex gap-2.5 items-start">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>Ready-to-use MVP Admin Credentials:</p>
            <div className="font-mono text-slate-400">
              User: <span className="text-teal-300">admin</span> / Pass: <span className="text-teal-300">admin123</span>
            </div>
            <button
              type="button"
              onClick={handleApplyDefaults}
              className="text-[10px] text-teal-400 underline hover:text-white pt-1 block cursor-pointer select-none"
            >
              Autofill these credentials
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">Username Code</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. administrator"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-900 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">Password Cipher</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-900 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-gradient-to-tr from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 border border-transparent disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-1.5 transition-all outline-none cursor-pointer"
          >
            {isLoggingIn ? (
              <span>Decrypting keys...</span>
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4 outline-none" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
