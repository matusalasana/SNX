import { Link } from "react-router-dom";
import { TriangleAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid-center min-h-screen bg-background p-6">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="flex-center mb-6">
          <div className="card inline-flex p-4">
            <TriangleAlert className="text-danger h-10 w-10" />
          </div>
        </div>

        {/* Code */}
        <h1 className="heading text-6xl">
          404
        </h1>

        {/* Message */}
        <h2 className="heading mt-4 text-xl font-semibold">
          Page not found
        </h2>

        <p className="subheading mt-3">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link to="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            <span>Back Home</span>
          </Link>

          <Link to="/projects" className="btn-outline">
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
