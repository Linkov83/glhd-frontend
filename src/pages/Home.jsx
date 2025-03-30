// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        🔬 Global Laser Hardening Database
      </h1>

      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-xl border border-gray-300 shadow-sm px-6 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Navigate
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleNavigation("/add")}
              role="menuitem"
            >
              ➕ Add Experiment
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleNavigation("/database")}
              role="menuitem"
            >
              📊 View Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
