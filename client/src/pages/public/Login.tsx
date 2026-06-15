// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Github,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  Fingerprint,
  User,
  Sparkles
} from 'lucide-react';

// Form validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

// Demo credentials (for testing)
const DEMO_CREDENTIALS = {
  email: 'demo@snx.dev',
  password: 'demo123'
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    setValue,
    trigger,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onChange'
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo authentication (replace with actual API call)
    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      setShowSuccess(true);
      // Store auth token (demo)
      localStorage.setItem('isAuthenticated', 'true');
      if (data.rememberMe) {
        localStorage.setItem('rememberEmail', data.email);
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setLoginError('Invalid email or password. Try demo@snx.dev / demo123');
    }
    
    setIsLoading(false);
  };

  const handleBiometricAuth = () => {
    // Check if biometric authentication is available
    if (window.PublicKeyCredential) {
      setIsBiometricSupported(true);
      // Simulate biometric auth
      alert('Biometric authentication demo - In production, this would use WebAuthn API');
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    trigger(['email', 'password']);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md px-margin-mobile">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative"
        >
          {/* Logo/Brand */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
              <Shield size={32} className="text-primary" />
            </div>
            <h1 className="font-headline-xl text-headline-xl mb-2">Welcome Back</h1>
            <p className="font-body-md text-on-surface-variant">
              Sign in to continue to your account
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-surface-container-low/80 backdrop-blur-sm rounded-2xl border border-outline-variant/30 p-6 md:p-8 shadow-2xl"
          >
            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-secondary/20 text-secondary rounded-xl flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  <span className="font-body-sm">Login successful! Redirecting...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 bg-error/20 text-error rounded-xl flex items-center gap-2"
                >
                  <AlertCircle size={18} />
                  <span className="font-body-sm">{loginError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-label-sm text-label-sm mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-surface-container border rounded-xl focus:outline-none focus:ring-2 transition-all font-body-sm
                      ${errors.email 
                        ? 'border-error focus:border-error focus:ring-error/20' 
                        : touchedFields.email && !errors.email
                          ? 'border-secondary focus:border-secondary focus:ring-secondary/20'
                          : 'border-outline-variant focus:border-primary focus:ring-primary/20'
                      }`}
                    {...register('email')}
                  />
                  {touchedFields.email && !errors.email && watchedEmail && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle size={16} className="text-secondary" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-error flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block font-label-sm text-label-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-surface-container border rounded-xl focus:outline-none focus:ring-2 transition-all font-body-sm
                      ${errors.password 
                        ? 'border-error focus:border-error focus:ring-error/20' 
                        : touchedFields.password && !errors.password && watchedPassword
                          ? 'border-secondary focus:border-secondary focus:ring-secondary/20'
                          : 'border-outline-variant focus:border-primary focus:ring-primary/20'
                      }`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-error flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20"
                    {...register('rememberMe')}
                  />
                  <span className="font-body-sm text-on-surface-variant">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset demo - Check console for email')}
                  className="font-body-sm text-primary hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-surface-container-low text-on-surface-variant">OR</span>
                </div>
              </div>

              {/* Alternative Login Options */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleBiometricAuth}
                  className="w-full py-2.5 bg-surface-container border border-outline-variant rounded-xl hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  <Fingerprint size={18} className="text-primary" />
                  <span className="font-body-sm">Use Biometric Authentication</span>
                </button>

                <button
                  type="button"
                  className="w-full py-2.5 bg-surface-container border border-outline-variant rounded-xl hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  <Github size={18} className="text-primary" />
                  <span className="font-body-sm">Continue with GitHub</span>
                </button>
              </div>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="font-label-sm text-label-sm text-primary">Demo Credentials</span>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="font-body-sm text-on-surface-variant">Email: demo@snx.dev</p>
                  <p className="font-body-sm text-on-surface-variant">Password: demo123</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full py-1.5 bg-primary/10 text-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/20 transition-all"
                >
                  Auto-fill Demo Credentials
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="font-body-sm text-on-surface-variant">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline font-label-sm inline-flex items-center gap-1"
                >
                  Sign up
                  <ArrowRight size={14} />
                </button>
              </p>
            </div>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            variants={fadeInUp}
            className="text-center mt-6 font-body-sm text-on-surface-variant"
          >
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;