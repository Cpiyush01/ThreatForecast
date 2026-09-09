import React from 'react';
import { Cpu, Zap, Activity, RefreshCw, Layers } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import TemporalContribution from './TemporalContribution';
import { useShap } from '../../hooks/useShap';
import { useForecast } from '../../hooks/useForecast';

export const ShapExplanation = () => {
  const { explanation, loading, runShap } = useShap();
  const { forecast, status } = useForecast();

  const isReady = Boolean(forecast && status?.ready_for_forecast);

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              AI MODEL EXPLANABILITY (SHAP KERNEL)
            </h3>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-0.5">
            KernelSHAP feature attribution: identifying signals pushing risk upward vs downward
          </p>
        </div>

        <div className="flex items-center gap-3">
          {explanation && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">HORIZON:</span>{' '}
              <strong className="text-cyan-400">+{explanation.horizon_seconds}s</strong>
              <span className="mx-2 text-slate-700">|</span>
              <span className="text-slate-400">RISK:</span>{' '}
              <strong className="text-slate-200">{explanation.risk_score.toFixed(4)}</strong>
            </div>
          )}

          <GlowButton
            onClick={runShap}
            disabled={!isReady || loading}
            variant="primary"
            icon={loading ? RefreshCw : Zap}
            className="text-xs"
          >
            {loading ? 'CALCULATING SHAP...' : 'EXPLAIN FORECAST WITH SHAP'}
          </GlowButton>
        </div>
      </div>

      {!explanation ? (
        <div className="py-16 text-center rounded-xl bg-slate-950/40 border border-slate-800/60 font-mono text-xs text-slate-500 space-y-2">
          <div>AWAITING SHAP EXPLANATION COMPUTATION</div>
          <div className="text-[10px] text-slate-600">
            {isReady
              ? 'Click "Explain Forecast with SHAP" to compute local feature contributions'
              : 'Waiting for 5-state history buffer to accumulate...'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Feature Drivers (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                TOP NETWORK FEATURE CONTRIBUTORS
              </span>
              <span className="text-[10px] text-slate-500">
                ABS SHAP IMPORTANCE RANKING
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {explanation.feature_contributions.slice(0, 14).map((feat, idx) => {
                const isPos = feat.shap_value >= 0;
                const fillWidth = Math.min(100, Math.max(5, feat.abs_shap * 1000));

                return (
                  <div
                    key={feat.feature || idx}
                    className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/70 font-mono text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-bold truncate max-w-xs">
                        {feat.feature}
                      </span>
                      <span
                        className={`font-mono text-xs font-bold ${isPos ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                      >
                        {isPos ? '+' : ''}
                        {feat.shap_value.toFixed(5)}
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 flex">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${isPos
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                          }`}
                        style={{ width: `${fillWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Temporal Window Attribution (1 col) */}
          <div className="lg:col-span-1">
            <TemporalContribution
              temporalContributions={explanation.temporal_contributions || []}
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default ShapExplanation;
