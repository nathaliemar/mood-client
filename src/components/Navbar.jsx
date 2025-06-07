import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { useAuthContext } from "../context/auth.context";

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-800">MoodApp</div>
        <div className="space-x-4 hidden md:flex flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link
            to="/analytics/user"
            className="text-gray-600 hover:text-gray-900"
          >
            Analytics
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-gray-900">
                Signup
              </Link>
            </>
          ) : (
            <>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
