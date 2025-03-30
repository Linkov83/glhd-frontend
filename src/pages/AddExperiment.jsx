import React from "react";
import { motion } from "framer-motion";
import ExperimentForm from "../components/ExperimentForm";

export default function AddExperiment() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <motion.h1
        className="text-2xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ➕ Add New Laser Hardening Experiment
      </motion.h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <ExperimentForm />
      </div>
    </div>
  );
}