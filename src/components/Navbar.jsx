import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">🔬 GLHD</h1>

        <div className="relative inline-block text-left">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center gap-1 bg-gray-700 hover:bg-gray-600 text-sm px-4 py-2 rounded-md"
          >
            Navigate
            <ChevronDown className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 ring-1 ring-black ring-opacity-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handleNavigate("/")}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => handleNavigate("/add")}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                >
                  ➕ Add Experiment
                </button>
                <button
                  onClick={() => handleNavigate("/browse")}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                >
                  📁 Browse Database
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
