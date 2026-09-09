import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export const HorizonCard = ({
  horizon,
  score,
  threshold = 0.05,
  isPeak = false,
  index = 0,
}) => {
  const numericScore = typeof score === 'number' && !isNaN(score) ? score : null;
  const isWarning = numericScore !== null && numericScore >= threshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <GlassCard
        hover
        className={`
          p-4 flex flex-col justify-between h-full transition-all duration-200
          ${
            isPeak
              ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
              : isWarning
              ? 'border-rose-500/40'
              : 'border-slate-800/80'
          }
        `}
      >
        {/* Card Header: Horizon & Peak Tag */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>+{horizon}s</span>
          </div>

          {isPeak ? (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
              PEAK RISK
            </span>
          ) : isWarning ? (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase tracking-wider">
              &ge; 0.05
            </span>
          ) : null}
        </div>

        {/* Risk Score Digital Display */}
        <div className="my-3">
          <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-0.5">
            RISK SCORE
          </div>
          <span
            className={`text-2xl font-extrabold font-mono tracking-tight ${
              isWarning ? 'text-rose-400 glow-red' : 'text-slate-100'
            }`}
          >
            {numericScore !== null ? numericScore.toFixed(4) : '—'}
          </span>
        </div>

        {/* Status Indicator & Mini Progress Bar */}
        <div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-2 border border-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (numericScore || 0) * 500)}%`,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isWarning
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono">
            <span
              className={`font-bold flex items-center gap-1 ${
                isWarning ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {isWarning ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  WARNING
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3" />
                  NORMAL
                </>
              )}
            </span>
            <span className="text-slate-500">T: 0.05</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default HorizonCard;
