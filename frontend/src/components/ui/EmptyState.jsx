import React from 'react';
import GlassCard from './GlassCard';

export const EmptyState = ({ message = 'WAITING FOR NETWORK TELEMETRY', icon: Icon }) => {
  return (
    <GlassCard className="p-10 flex flex-col items-center justify-center text-center border-dashed border-slate-800">
      {Icon && <Icon className="w-8 h-8 text-slate-500 mb-3" />}
      <div className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
        {message}
      </div>
    </GlassCard>
  );
};

export default EmptyState;
