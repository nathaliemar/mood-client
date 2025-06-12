import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { useAuthContext } from "../context/auth.context";

const Navbar = () => {
  //TODO: Hide/Show specific content if user is Admin
  const { user, isLoggedIn, isLoading } = useAuthContext();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={"/"}>
          <div className="text-xl font-semibold text-gray-800">MoodApp</div>
        </Link>
        <div className="space-x-4 hidden md:flex flex items-center">
          {/* Show "Home" if not logged in, "Dashboard" if logged in */}
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            {isLoggedIn ? "Dashboard" : "Home"}
          </Link>
          {/* Only show these links if logged in */}
          {isLoggedIn && (
            <>
              <Link
                to="/analytics/user"
                className="text-gray-600 hover:text-gray-900"
              >
                My Entries
              </Link>
              {user?.team && (
                <Link
                  to="/analytics/team"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Team
                </Link>
              )}
              <Link
                to="/settings/users"
                className="text-gray-600 hover:text-gray-900"
              >
                Users
              </Link>
              <Link
                to="/settings/teams"
                className="text-gray-600 hover:text-gray-900"
              >
                Teams
              </Link>
            </>
          )}

          {isLoading ? null : isLoggedIn ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-gray-900">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
