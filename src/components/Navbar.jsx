import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { useAuthContext } from "../context/auth.context";

const Navbar = () => {
  const { user, isLoggedIn, isLoading } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to check if a path is active
  const isActive = (path) => {
    if (path === "/") {
      // Only highlight Dashboard/Home on "/" or "/dashboard"
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    // For other links, highlight only on exact match
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between w-full">
        <Link to={"/"}>
          <div className="text-xl font-semibold text-gray-800">🔮 Moodi</div>
        </Link>
        {/* Hamburger button */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className={`text-gray-600 hover:text-gray-900 ${
              isActive("/") ? "font-bold text-indigo-600" : ""
            }`}
          >
            {isLoggedIn ? "Dashboard" : "Home"}
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/analytics/user"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/analytics/user") ? "font-bold text-indigo-600" : ""
                }`}
              >
                My Entries
              </Link>
              {user?.team && (
                <Link
                  to="/analytics/team"
                  className={`text-gray-600 hover:text-gray-900 ${
                    isActive("/analytics/team")
                      ? "font-bold text-indigo-600"
                      : ""
                  }`}
                >
                  My Team
                </Link>
              )}
              {user?.role === "admin" && (
                <>
                  <Link
                    to="/settings/users"
                    className={`text-gray-600 hover:text-gray-900 ${
                      isActive("/settings/users")
                        ? "font-bold text-indigo-600"
                        : ""
                    }`}
                  >
                    Users
                  </Link>
                  <Link
                    to="/settings/teams"
                    className={`text-gray-600 hover:text-gray-900 ${
                      isActive("/settings/teams")
                        ? "font-bold text-indigo-600"
                        : ""
                    }`}
                  >
                    Teams
                  </Link>
                </>
              )}
            </>
          )}
          {isLoading ? null : isLoggedIn ? (
            <span className="ml-2">
              {/* Show text on desktop */}
              <LogoutButton />
            </span>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/login") ? "font-bold text-indigo-600" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/signup") ? "font-bold text-indigo-600" : ""
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-50">
            <Link
              to="/"
              className={`py-2 text-gray-600 hover:text-gray-900 ${
                isActive("/") ? "font-bold text-indigo-600" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {isLoggedIn ? "Dashboard" : "Home"}
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/analytics/user"
                  className={`py-2 text-gray-600 hover:text-gray-900 ${
                    isActive("/analytics/user")
                      ? "font-bold text-indigo-600"
                      : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  My Entries
                </Link>
                {user?.team && (
                  <Link
                    to="/analytics/team"
                    className={`py-2 text-gray-600 hover:text-gray-900 ${
                      isActive("/analytics/team")
                        ? "font-bold text-indigo-600"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Team
                  </Link>
                )}
                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/settings/users"
                      className={`py-2 text-gray-600 hover:text-gray-900 ${
                        isActive("/settings/users")
                          ? "font-bold text-indigo-600"
                          : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to="/settings/teams"
                      className={`py-2 text-gray-600 hover:text-gray-900 ${
                        isActive("/settings/teams")
                          ? "font-bold text-indigo-600"
                          : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Teams
                    </Link>
                  </>
                )}
              </>
            )}
            {isLoading ? null : isLoggedIn ? (
              <span className="py-2 flex items-center w-full justify-center">
                <LogoutButton onClick={() => setMenuOpen(false)} />
              </span>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`py-2 text-gray-600 hover:text-gray-900 ${
                    isActive("/login") ? "font-bold text-indigo-600" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`py-2 text-gray-600 hover:text-gray-900 ${
                    isActive("/signup") ? "font-bold text-indigo-600" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
