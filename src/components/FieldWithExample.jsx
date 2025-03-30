import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ExperimentForm({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/experiments/", formData)
      .then(() => {
        alert("Experiment created!");
        onSuccess();
        setFormData({ ...formData, example_alloy: "" });
        setStep(1);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to create experiment.");
      });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-700">➕ Add Experiment</h2>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          <InputField label="metal class" name="metal_class" value={formData.metal_class} onChange={handleChange} />
          <InputField label="subclass" name="subclass" value={formData.subclass} onChange={handleChange} />
          <InputField label="example alloy" name="example_alloy" value={formData.example_alloy} onChange={handleChange} />
          <InputField label="chemical composition" name="chemical_composition" value={formData.chemical_composition} onChange={handleChange} />
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-4">
          <InputField label="laser power" name="laser_power" value={formData.laser_power} onChange={handleChange} />
          <InputField label="scan speed" name="scan_speed" value={formData.scan_speed} onChange={handleChange} />
          <InputField label="beam spot" name="beam_spot" value={formData.beam_spot} onChange={handleChange} />
          <InputField label="beam quality" name="beam_quality" value={formData.beam_quality} onChange={handleChange} />
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-2 gap-4">
          <InputField label="surface material" name="surface_material" value={formData.surface_material} onChange={handleChange} />
          <InputField label="pre treatment" name="pre_treatment" value={formData.pre_treatment} onChange={handleChange} />
          <InputField label="temp range" name="temp_range" value={formData.temp_range} onChange={handleChange} />
          <InputField label="surface hardness" name="surface_hardness" value={formData.surface_hardness} onChange={handleChange} />
          <InputField label="hardened layer depth" name="hardened_layer_depth" value={formData.hardened_layer_depth} onChange={handleChange} />
          <InputField label="residual stresses" name="residual_stresses" value={formData.residual_stresses} onChange={handleChange} />
          <InputField label="wear resistance" name="wear_resistance" value={formData.wear_resistance} onChange={handleChange} />
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-1 gap-4">
          <InputField label="source" name="source" value={formData.source} onChange={handleChange} />
        </div>
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Back</button>}
        {step < 4 && <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>}
        {step === 4 && <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>}
      </div>
    </form>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 capitalize mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
