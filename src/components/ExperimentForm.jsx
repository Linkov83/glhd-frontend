import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ExperimentForm({ onSuccess }) {
  const initialFormData = {
    metal_class: "",
    subclass: "",
    example_alloy: "",
    chemical_composition: "",
    laser_power: "",
    scan_speed: "",
    beam_spot: "",
    beam_quality: "",
    surface_material: "",
    pre_treatment: "",
    temp_range: "",
    surface_hardness: "",
    hardened_layer_depth: "",
    residual_stresses: "",
    wear_resistance: "",
    source: "",
  };

  const fieldExamples = {
    metal_class: "Steel",
    subclass: "Tool Steel",
    example_alloy: "X38CrMoV5-1",
    chemical_composition: "0.38%C, 5%Cr, 1%Mo, 0.4%V",
    laser_power: "1200",
    scan_speed: "1500",
    beam_spot: "0.8",
    beam_quality: "M²=1.1",
    surface_material: "Steel plate",
    pre_treatment: "Annealing",
    temp_range: "600-800°C",
    surface_hardness: "700 HV",
    hardened_layer_depth: "0.4",
    residual_stresses: "Low",
    wear_resistance: "High",
    source: "Doe et al., 2021",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Material Parameters",
      fields: ["metal_class", "subclass", "example_alloy", "chemical_composition"],
    },
    {
      title: "Laser Parameters",
      fields: ["laser_power", "scan_speed", "beam_spot", "beam_quality"],
    },
    {
      title: "Processing Info",
      fields: ["surface_material", "pre_treatment", "temp_range"],
    },
    {
      title: "Results",
      fields: ["surface_hardness", "hardened_layer_depth", "residual_stresses", "wear_resistance"],
    },
    {
      title: "Source & Submit",
      fields: ["source"],
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/experiments/", formData)
      .then(res => {
        toast.success("✅ Experiment created successfully!");
        onSuccess();
        setFormData(initialFormData);
        setStep(0);
      })
      .catch(err => {
        console.error("Error:", err);
        toast.error("❌ Failed to create experiment!");
      });
  };

  const currentStep = steps[step];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">🧪 {currentStep.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentStep.fields.map((key) => (
          <div key={key}>
            <label className="block text-xs text-gray-600 capitalize mb-1">
              {key.replace(/_/g, " ")}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-400 italic whitespace-nowrap">
                Пример: {fieldExamples[key]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
          >
            ← Previous
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
