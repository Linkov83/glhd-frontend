// src/pages/BrowsePage.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

function BrowsePage() {
  const [experiments, setExperiments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await api.get("/experiments/"); // <-- или /experiments/all/ ако ползваш custom route
        setExperiments(response.data);
      } catch (error) {
        console.error("Error fetching experiments:", error);
      }
    };

    fetchExperiments();
  }, []);

  const filteredExperiments = experiments.filter((exp) =>
    exp.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by material name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Material</th>
            <th className="border p-2">Laser Power</th>
            <th className="border p-2">Hardness</th>
            {/* добави още колони ако искаш */}
          </tr>
        </thead>
        <tbody>
          {filteredExperiments.map((exp, index) => (
            <tr key={index}>
              <td className="border p-2">{exp.material_name}</td>
              <td className="border p-2">{exp.laser_power}</td>
              <td className="border p-2">{exp.hardness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BrowsePage;
