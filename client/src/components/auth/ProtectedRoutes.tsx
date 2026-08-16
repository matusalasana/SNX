import { Navigate, Outlet } from "react-router-dom";
import { Terminal } from "lucide-react";
import { useAuth } from "../../hooks/auth/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuth();

  // Authentication request failed
  if (isError) {
    return <Navigate to="/" replace />;
  }

  // Checking authentication
  if (isLoading) {
    return (
      <div className="relative flex-center min-h-screen overflow-hidden bg-background">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-muted/50 blur-3xl" />
        </div>

        {/* Loader */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />

          {/* Brand */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-primary">
              <Terminal className="h-5 w-5" />

              <span className="heading font-bold tracking-wide">
                Sana M.
              </span>
            </div>

            <p className="subheading text-xs uppercase tracking-widest">
              Securing dashboard access
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Authenticated
  return <Outlet />;
};

export default ProtectedRoutes;
