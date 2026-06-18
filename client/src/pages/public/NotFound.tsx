import { Link } from "react-router-dom";
import { TriangleAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-black text-white">
      <div className="text-center max-w-md">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <TriangleAlert className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        {/* Code */}
        <h1 className="text-6xl font-bold tracking-tight">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold mt-4">
          Page not found
        </h2>

        <p className="text-zinc-400 mt-3">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          
          <Link
            to="/"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3 rounded-xl
              bg-amber-500 text-black
              font-medium
              hover:bg-amber-400
              transition
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>

          <Link
            to="/projects"
            className="
              inline-flex items-center justify-center
              px-5 py-3 rounded-xl
              border border-zinc-800
              text-zinc-300
              hover:border-amber-500/40
              hover:text-amber-300
              transition
            "
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}