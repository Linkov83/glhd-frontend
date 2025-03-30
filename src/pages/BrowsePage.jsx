import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function BrowsePage() {
  const [experiments, setExperiments] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [metalFilter, setMetalFilter] = useState("");
  const [powerMin, setPowerMin] = useState("");
  const [powerMax, setPowerMax] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/experiments/list/")
      .then((res) => setExperiments(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " 🔼" : " 🔽";
  };

  // 🔍 Apply all filters
  const filteredData = experiments
    .filter((exp) =>
      exp.example_alloy?.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((exp) => (metalFilter ? exp.metal_class === metalFilter : true))
    .filter((exp) => {
      const power = parseFloat(exp.laser_power);
      const min = parseFloat(powerMin);
      const max = parseFloat(powerMax);
      if (powerMin && isNaN(power)) return false;
      if (powerMax && isNaN(power)) return false;
      if (powerMin && power < min) return false;
      if (powerMax && power > max) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      if (!isNaN(aVal) && !isNaN(bVal)) {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const uniqueMetalClasses = [...new Set(experiments.map(e => e.metal_class).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📊 Browse Laser Hardening Experiments
      </motion.h1>

      {/* 🔍 Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Example Alloy"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        />

        <select
          value={metalFilter}
          onChange={(e) => setMetalFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="">All Metal Classes</option>
          {uniqueMetalClasses.map((metal) => (
            <option key={metal} value={metal}>
              {metal}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Power (W)"
            value={powerMin}
            onChange={(e) => setPowerMin(e.target.value)}
            className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max Power (W)"
            value={powerMax}
            onChange={(e) => setPowerMax(e.target.value)}
            className="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      {/* 📋 Table */}
      <div className="overflow-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {[
                { key: "metal_class", label: "Metal Class" },
                { key: "subclass", label: "Subclass" },
                { key: "example_alloy", label: "Example Alloy" },
                { key: "chemical_composition", label: "Chemical Composition" },
                { key: "laser_power", label: "Laser Power (W)" },
                { key: "scan_speed", label: "Scan Speed (mm/s)" },
                { key: "beam_spot", label: "Beam Spot" },
                { key: "beam_quality", label: "Beam Quality" },
                { key: "surface_material", label: "Surface Material" },
                { key: "pre_treatment", label: "Pre-treatment" },
                { key: "temp_range", label: "Temp Range" },
                { key: "surface_hardness", label: "Hardness (HV)" },
                { key: "hardened_layer_depth", label: "Layer Depth (mm)" },
                { key: "residual_stresses", label: "Residual Stresses" },
                { key: "wear_resistance", label: "Wear Resistance" },
                { key: "source", label: "Source" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {renderSortIcon(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((exp, idx) => (
                <motion.tr
                  key={idx}
                  className="hover:bg-gray-50 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  {Object.keys(exp).map((key) => (
                    <td key={key} className="p-2">
                      {exp[key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center py-6 text-gray-400">
                  No experiments match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
