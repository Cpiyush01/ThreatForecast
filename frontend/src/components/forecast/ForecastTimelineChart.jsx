import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, Activity, AlertCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useForecast } from '../../hooks/useForecast';

const HORIZONS = [10, 20, 30, 40, 50, 60];
const THRESHOLD = 0.05;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isOver = value >= THRESHOLD;
    return (
      <div className="p-3 rounded-xl bg-slate-950/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl font-mono text-xs">
        <div className="text-slate-400 font-bold mb-1">
          Horizon: <span className="text-cyan-400">+{label}s</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Predicted Risk:</span>
          <span className={`font-black text-sm ${isOver ? 'text-rose-400 glow-red' : 'text-cyan-300'}`}>
            {Number(value).toFixed(4)}
          </span>
        </div>
        <div className="mt-1 text-[10px] text-slate-500">
          Threshold: 0.05 ({isOver ? 'WARNING' : 'SAFE'})
        </div>
      </div>
    );
  }
  return null;
};

export const ForecastTimelineChart = () => {
  const { forecast } = useForecast();

  const chartData = forecast?.risk_scores
    ? HORIZONS.map((h, i) => ({
        h,
        risk: forecast.risk_scores[i] ?? 0,
      }))
    : HORIZONS.map((h) => ({ h, risk: 0 }));

  const maxRisk = forecast?.risk_scores ? Math.max(...forecast.risk_scores) : 0;
  const peakHorizon = forecast?.peak_risk_horizon_seconds ?? '—';
  const overThresholdCount = forecast?.risk_scores
    ? forecast.risk_scores.filter((r) => r >= THRESHOLD).length
    : 0;

  return (
    <GlassCard className="p-6 relative">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              TEMPORAL ATTACK TRAJECTORY
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-200 mt-1 font-mono">
            10–60 Second Risk Horizon Forecast
          </h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">PEAK:</span>
            <strong className="text-cyan-400">+{peakHorizon}s</strong>
            <span className="text-slate-500">({maxRisk.toFixed(4)})</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
              overThresholdCount > 0
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>
              <strong>{overThresholdCount}</strong>/6 &ge; 0.05
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
            <defs>
              <linearGradient id="cyberRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.45} />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#080f24" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 41, 59, 0.4)" vertical={false} />

            <XAxis
              dataKey="h"
              stroke="#64748b"
              tickFormatter={(v) => `+${v}s`}
              tick={{ fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: 'rgba(51, 65, 85, 0.6)' }}
              tickLine={false}
            />

            <YAxis
              stroke="#64748b"
              domain={[0, (dataMax) => Math.max(0.12, Math.ceil(dataMax * 20) / 20)]}
              tick={{ fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: 'rgba(51, 65, 85, 0.6)' }}
              tickLine={false}
              tickFormatter={(v) => Number(v).toFixed(2)}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Threshold marker */}
            <ReferenceLine
              y={THRESHOLD}
              stroke="#ef4444"
              strokeDasharray="5 5"
              strokeWidth={1.5}
              label={{
                value: 'OPERATIONAL THRESHOLD 0.05',
                fill: '#f87171',
                fontSize: 10,
                position: 'insideTopRight',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            />

            <Area
              type="monotone"
              dataKey="risk"
              stroke="#00e5ff"
              strokeWidth={2.5}
              fill="url(#cyberRiskGradient)"
              activeDot={{
                r: 6,
                fill: '#00e5ff',
                stroke: '#ffffff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px #00e5ff)',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default ForecastTimelineChart;
