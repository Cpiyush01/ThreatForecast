import React from 'react';

export const StatusBadge = ({ status = 'normal', text, pulse = true, className = '' }) => {
  const isWarning = status === 'warning' || status === 'danger' || status === 'critical';
  const isOk = status === 'ok' || status === 'connected' || status === 'normal' || status === 'safe';

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (isWarning) {
    colorClasses = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    dotColor = 'bg-rose-500';
  } else if (isOk) {
    colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-bold tracking-wider ${colorClasses} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} ${pulse ? 'animate-pulse' : ''}`} />
      <span>{text}</span>
    </div>
  );
};

export default StatusBadge;
