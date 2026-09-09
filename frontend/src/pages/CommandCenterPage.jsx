import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/dashboard/Dashboard';

export const CommandCenterPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Dashboard />
    </motion.div>
  );
};

export default CommandCenterPage;
