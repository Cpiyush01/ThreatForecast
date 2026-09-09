import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ATTACK_COLOR_CLASSES = {
  'Port Scan': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  'DDoS / DoS': 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  'Brute Force': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Public-Facing Service Attack': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  'Network Reconnaissance': 'text-teal-400 bg-teal-500/10 border-teal-500/30',
};

export const MitreTechniqueCard = ({ item, index = 0 }) => {
  const attackBadge = ATTACK_COLOR_CLASSES[item.attack_type] || 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  const isHighSeverity = item.severity === 'CRITICAL' || item.severity === 'HIGH';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <GlassCard className="p-5 flex flex-col justify-between h-full border border-slate-800/80 hover:border-slate-700 transition-colors">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${attackBadge}`}>
              {item.attack_type}
            </span>

            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                isHighSeverity
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}
            >
              {item.severity}
            </span>
          </div>

          {/* Technique Title & Tactic */}
          <h4 className="text-sm font-bold font-mono text-slate-100 mb-1">
            <span className="text-cyan-400 font-extrabold">{item.technique_id}</span>
            <span className="text-slate-500 mx-1.5">&middot;</span>
            <span>{item.name}</span>
          </h4>

          <div className="text-[11px] font-mono text-slate-400 mb-3">
            TACTIC: <strong className="text-slate-200">{item.tactic}</strong>
          </div>

          {/* Heuristic Score Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-400">HEURISTIC SCORE</span>
              <span className="text-cyan-300 font-bold">{item.score.toFixed(4)}</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${Math.min(100, item.score * 100)}%` }}
              />
            </div>
          </div>

          {/* Evidence Checklist */}
          {Array.isArray(item.evidence) && item.evidence.length > 0 && (
            <div className="space-y-1.5 mb-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                EVIDENCE SIGNALS
              </span>
              {item.evidence.map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-1.5 rounded bg-slate-950/60 border border-slate-800/60 text-[10px] font-mono text-slate-300"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{ev}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interpretation Footer */}
        {item.interpretation && (
          <div className="pt-3 border-t border-slate-800/60 flex items-start gap-1.5 text-[10px] font-mono text-slate-500">
            <Info className="w-3 h-3 text-slate-600 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{item.interpretation}</span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default MitreTechniqueCard;
