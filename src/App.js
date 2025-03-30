import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import DatabasePage from "./pages/DatabasePage";
import AddExperiment from "./pages/AddExperiment";
import BrowsePage from "./pages/BrowsePage"; // ✅ Добавен

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage />} />
        <Route path="/add" element={<AddExperiment />} />
        <Route path="/browse" element={<BrowsePage />} /> {/* ✅ Коригиран */}
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Може да смениш на "light" или "dark"
      />
    </Router>
  );
}

export default App;
