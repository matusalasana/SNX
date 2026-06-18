import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { Terminal } from "lucide-react";

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuth();

  // ❌ Error state → force logout redirect
  if (isError) {
    return <Navigate to="/" replace />;
  }

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

        {/* Ambient glow background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-800/20 blur-3xl rounded-full" />
        </div>

        {/* Loader content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">

          {/* Spinner */}
          <div className="w-10 h-10 border-2 border-zinc-800 border-t-amber-400 rounded-full animate-spin" />

          {/* Brand */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Terminal className="w-5 h-5" />
              <span className="font-bold tracking-wide">
                SNX Admin
              </span>
            </div>

            <p className="text-xs text-zinc-500 tracking-widest uppercase">
              Securing dashboard access
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ❌ Not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authenticated
  return <Outlet />;
};

export default ProtectedRoutes;