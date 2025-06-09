import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 mb-4 text-center tracking-wide">
        404 - Page Not Found
      </h1>
      <p className="text-base sm:text-lg text-slate-500 text-center max-w-md mb-8">
        Sorry, the page you are looking for does not exist. :( <br />
        Please check the URL or return to the homepage.
      </p>
      <Link to="/" className="inline-block">
        <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Home
        </button>
      </Link>
    </div>
  );
}

export { NotFoundPage };
