// src/components/ExperimentTable.jsx
import React from "react";

export default function ExperimentTable({ data }) {
  return (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="bg-blue-100 text-gray-800">
        <tr>
          {[
            "Metal Class", "Subclass", "Example Alloy", "Laser Power (W)",
            "Scan Speed (mm/s)", "Beam Spot", "Beam Quality", "Hardness (HV)",
            "Layer Depth (mm)", "Wear Resistance", "Source"
          ].map((header) => (
            <th key={header} className="p-2 border-b border-gray-200 font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((exp, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="p-2 border-b">{exp.metal_class}</td>
            <td className="p-2 border-b">{exp.subclass}</td>
            <td className="p-2 border-b">{exp.example_alloy}</td>
            <td className="p-2 border-b">{exp.laser_power}</td>
            <td className="p-2 border-b">{exp.scan_speed}</td>
            <td className="p-2 border-b">{exp.beam_spot}</td>
            <td className="p-2 border-b">{exp.beam_quality}</td>
            <td className="p-2 border-b">{exp.surface_hardness}</td>
            <td className="p-2 border-b">{exp.hardened_layer_depth}</td>
            <td className="p-2 border-b">{exp.wear_resistance}</td>
            <td className="p-2 border-b">{exp.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
