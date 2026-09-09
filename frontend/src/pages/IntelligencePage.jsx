import React from 'react';
import { motion } from 'framer-motion';
import ThreatStatus from '../components/threat/ThreatStatus';
import ShapExplanation from '../components/intelligence/ShapExplanation';
import MitrePanel from '../components/intelligence/MitrePanel';

export const IntelligencePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* High-level Threat Assessment & Heuristic Evidence */}
      <ThreatStatus />

      {/* SHAP Kernel Feature Attribution & Temporal Window Weighting */}
      <ShapExplanation />

      {/* MITRE ATT&CK Contextual Technique Matches */}
      <MitrePanel />
    </motion.div>
  );
};

export default IntelligencePage;
