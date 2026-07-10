import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <h1 className="text-5xl font-bold text-blue-600">404</h1>
        <p className="text-slate-700 text-lg mt-4">Page not found</p>
        <p className="text-slate-500 mt-2">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/dashboard"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;