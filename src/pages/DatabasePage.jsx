import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">🔬 GLHD</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/database" className="hover:text-gray-300">Database</Link>
          <Link to="/add" className="hover:text-gray-300">Add Experiment</Link>
        </div>
      </div>
    </nav>
  );
}