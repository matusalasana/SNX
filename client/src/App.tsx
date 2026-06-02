import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layout and Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { BlogList } from './pages/Blog';
import { SingleBlog } from './pages/SingleBlog';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Guard Component for Admin Protected Routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) {
    return (
      <div className="py-24 text-center text-sm font-mono text-slate-500 flex-grow flex items-center justify-center">
        <span>Authenticating admin credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-slate-900 text-slate-100 border border-slate-800 text-xs font-semibold',
              duration: 3000,
              style: {
                background: '#0f172a',
                color: '#f1f5f9',
                border: '1px solid #1e293b'
              }
            }}
          />
          <MainLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch All Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export { queryClient };
