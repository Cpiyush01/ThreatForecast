import React from 'react';
import { motion } from 'framer-motion';

export const GlowButton = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button',
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 border border-cyan-400/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 shadow-md',
    danger: 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30',
    outline: 'bg-transparent border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 shadow-sm',
    ghost: 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50',
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};

export default GlowButton;
