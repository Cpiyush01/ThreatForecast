import React from 'react';
import GlassCard from './GlassCard';

export const MetricCard = ({ title, value, subtitle, tone = 'normal', icon: Icon }) => {
  const isDanger = tone === 'danger' || tone === 'critical';
  const isWarning = tone === 'warning';

  return (
    <GlassCard className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
          {title}
        </span>
        {Icon && <Icon className={`w-4 h-4 ${isDanger ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-cyan-400'}`} />}
      </div>

      <div className="my-2">
        <span className={`text-2xl lg:text-3xl font-extrabold font-mono tracking-tight ${isDanger ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-slate-100'}`}>
          {value}
        </span>
      </div>

      <div className="text-xs text-slate-400 font-medium truncate">
        {subtitle}
      </div>
    </GlassCard>
  );
};

export default MetricCard;
