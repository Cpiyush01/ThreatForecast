import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export const ThreatScoreGauge = ({ score = 0, peakHorizon = 10, threshold = 0.05 }) => {
  const numericScore = typeof score === 'number' && !isNaN(score) ? score : 0;
  
  // Risk evaluation
  let status = 'SAFE';
  let statusColor = 'text-emerald-400';
  let strokeColor = '#10b981';
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  let bgGradient = 'from-emerald-500/10';

  if (numericScore >= 0.20) {
    status = 'CRITICAL';
    statusColor = 'text-rose-500 glow-red';
    strokeColor = '#ef4444';
    glowColor = 'rgba(239, 68, 68, 0.6)';
    bgGradient = 'from-rose-500/15';
  } else if (numericScore >= 0.10) {
    status = 'HIGH';
    statusColor = 'text-orange-500';
    strokeColor = '#f97316';
    glowColor = 'rgba(249, 115, 22, 0.5)';
    bgGradient = 'from-orange-500/15';
  } else if (numericScore >= threshold) {
    status = 'ELEVATED';
    statusColor = 'text-amber-400 glow-amber';
    strokeColor = '#f59e0b';
    glowColor = 'rgba(245, 158, 11, 0.45)';
    bgGradient = 'from-amber-500/10';
  }

  // Gauge calculation: 270 degree arc
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  // Max scale is 0.50 (anything >= 0.5 is maximum gauge)
  const normalizedProgress = Math.min(1, Math.max(0, numericScore / 0.50));
  const strokeDashoffset = arcLength * (1 - normalizedProgress);

  return (
    <GlassCard className="p-6 flex flex-col items-center justify-between relative overflow-hidden h-full">
      {/* Background ambient glow based on status */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${bgGradient} to-transparent opacity-40 pointer-events-none`}
      />

      {/* Header */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            {numericScore >= threshold ? (
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              THREAT INDEX
            </span>
            <div className="text-[10px] font-mono text-slate-500">
              PEAK TRAJECTORY RISK
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
          <span>PEAK:</span>
          <strong className="text-cyan-400">+{peakHorizon}s</strong>
        </div>
      </div>

      {/* Radial HUD Gauge */}
      <div className="relative my-4 flex items-center justify-center">
        <svg width="220" height="200" viewBox="0 0 220 200" className="transform -rotate-[135deg]">
          {/* Background Track Ring */}
          <circle
            cx="110"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(30, 41, 59, 0.6)"
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Operational Threshold Marker Tick */}
          {/* 0.05 / 0.50 = 10% of 270deg = 27deg from start */}
          <circle
            cx="110"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="14"
            strokeDasharray={`4 ${circumference}`}
            strokeDashoffset={-(arcLength * (threshold / 0.50))}
          />

          {/* Dynamic Fill Arc */}
          <motion.circle
            cx="110"
            cy="100"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`
            }}
          />
        </svg>

        {/* Center Digital Readout HUD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-0.5">
            CURRENT VALUE
          </div>
          <motion.span 
            key={numericScore.toFixed(4)}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-extrabold font-mono tracking-tight text-white drop-shadow-md"
          >
            {numericScore.toFixed(4)}
          </motion.span>
          <div className={`mt-1 font-mono text-xs font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-slate-800/80 bg-slate-950/70 ${statusColor}`}>
            {status}
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/60 font-mono text-[11px] z-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500">OPERATIONAL THRESHOLD</span>
          <span className="font-bold text-rose-400">0.0500</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-slate-500">MODEL INFERENCE</span>
          <span className="font-bold text-cyan-400">10s–60s HORIZON</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ThreatScoreGauge;
