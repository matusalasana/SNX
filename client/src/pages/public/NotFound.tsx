import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}