// BrowseData.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ExperimentTable from "../components/ExperimentTable";

export default function BrowseData() {
  const [experiments, setExperiments] = useState([]);
  const [filters, setFilters] = useState({
    example_alloy: "",
    metal_class: "",
    beam_quality: "",
    laser_power_min: "",
    laser_power_max: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/experiments/list/")
      .then((res) => setExperiments(res.data))
      .catch((err) => console.error("Error fetching experiments:", err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = experiments.filter((exp) => {
    const matchAlloy = exp.example_alloy?.toLowerCase().includes(filters.example_alloy.toLowerCase());
    const matchMetal = filters.metal_class === "" || exp.metal_class === filters.metal_class;
    const matchQuality = filters.beam_quality === "" || exp.beam_quality === filters.beam_quality;
    const matchPowerMin = filters.laser_power_min === "" || parseFloat(exp.laser_power) >= parseFloat(filters.laser_power_min);
    const matchPowerMax = filters.laser_power_max === "" || parseFloat(exp.laser_power) <= parseFloat(filters.laser_power_max);

    return matchAlloy && matchMetal && matchQuality && matchPowerMin && matchPowerMax;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🔍 Browse Experiments
      </motion.h1>

      {/* Filter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow mb-6">
        <input
          name="example_alloy"
          value={filters.example_alloy}
          onChange={handleFilterChange}
          placeholder="🔎 Example Alloy"
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          name="metal_class"
          value={filters.metal_class}
          onChange={handleFilterChange}
          placeholder="🧪 Metal Class"
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          name="beam_quality"
          value={filters.beam_quality}
          onChange={handleFilterChange}
          placeholder="🔦 Beam Quality"
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          name="laser_power_min"
          value={filters.laser_power_min}
          onChange={handleFilterChange}
          placeholder="⚡ Min Power (W)"
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          name="laser_power_max"
          value={filters.laser_power_max}
          onChange={handleFilterChange}
          placeholder="⚡ Max Power (W)"
          className="border px-3 py-2 rounded text-sm"
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow overflow-auto">
        <ExperimentTable data={filteredData} />
      </div>
    </div>
  );
}
