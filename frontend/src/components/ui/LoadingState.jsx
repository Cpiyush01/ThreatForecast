import React from 'react';
import GlassCard from './GlassCard';

export const LoadingState = ({ message = 'INITIALIZING THREATFORECAST...' }) => {
  return (
    <GlassCard className="p-12 flex flex-col items-center justify-center text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <div className="font-mono text-sm font-bold tracking-widest text-cyan-400 uppercase animate-pulse">
        {message}
      </div>
    </GlassCard>
  );
};

export default LoadingState;
