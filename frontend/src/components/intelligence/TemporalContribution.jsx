import React from 'react';
import { Clock, Layers } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export const TemporalContribution = ({ temporalContributions = [] }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          TEMPORAL WINDOW ATTRIBUTION (50s)
        </h4>
      </div>

      <p className="text-[10px] text-slate-500 font-mono mb-4">
        Relative weight of each historical 10-second state in the transformer attention forecast
      </p>

      <div className="space-y-3 font-mono text-xs">
        {temporalContributions.map((item, idx) => {
          const isPos = item.shap_sum >= 0;
          const barWidth = Math.min(100, (item.abs_shap_sum || Math.abs(item.shap_sum)) * 700);

          return (
            <div key={item.relative_time || idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-bold">
                  {item.relative_time}
                </span>
                <span className={`font-bold ${isPos ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {isPos ? '+' : ''}
                  {item.shap_sum.toFixed(5)}
                </span>
              </div>

              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 flex">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isPos
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      : 'bg-gradient-to-r from-slate-600 to-slate-500'
                    }`}
                  style={{ width: `${Math.max(4, barWidth)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemporalContribution;
