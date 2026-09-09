import React from 'react';
import GlassCard from './GlassCard';

export const ErrorState = ({ message = 'UNABLE TO LOAD DATA' }) => {
  return (
    <GlassCard className="p-4 bg-rose-500/10 border-rose-500/30 text-rose-300 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span className="font-mono text-xs font-bold tracking-wide">{message}</span>
      </div>
    </GlassCard>
  );
};

export default ErrorState;
