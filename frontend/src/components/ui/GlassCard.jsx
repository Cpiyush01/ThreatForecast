import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', glow = false, onClick, hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-xl
        bg-slate-900/70 border border-slate-800/80
        shadow-xl shadow-black/40
        ${glow ? 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-cyan-500/10 before:to-blue-500/10 before:blur-xl' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
