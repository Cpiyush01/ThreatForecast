import React from 'react';
import HorizonCard from './HorizonCard';
import { useForecast } from '../../hooks/useForecast';

const HORIZONS = [10, 20, 30, 40, 50, 60];

export const SixHorizonGrid = () => {
  const { forecast } = useForecast();

  const riskScores = Array.isArray(forecast?.risk_scores) ? forecast.risk_scores : [];
  const peakHorizon = forecast?.peak_risk_horizon_seconds ?? null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            MULTI-HORIZON PROJECTION GRID
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            6 STEPS
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Threshold: <strong className="text-rose-400">0.05</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HORIZONS.map((h, index) => {
          const score = riskScores[index] !== undefined ? riskScores[index] : null;
          const isPeak = peakHorizon === h;

          return (
            <HorizonCard
              key={h}
              horizon={h}
              score={score}
              threshold={0.05}
              isPeak={isPeak}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SixHorizonGrid;
