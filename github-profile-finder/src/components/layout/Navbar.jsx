import { Link, NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            GitHub Finder
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/finder"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              GitHub Finder
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
