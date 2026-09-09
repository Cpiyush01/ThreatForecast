import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MotionWrapper = ({ children, activeKey, className = '' }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionWrapper;
