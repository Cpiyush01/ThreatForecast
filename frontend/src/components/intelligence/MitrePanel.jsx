import React from 'react';
import { Shield, ExternalLink, Info } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import MitreTechniqueCard from './MitreTechniqueCard';
import { useMitre } from '../../hooks/useMitre';

export const MitrePanel = () => {
  const { candidates } = useMitre();

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              MITRE ATT&CK &reg; HEURISTIC CORRELATION
            </h3>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-0.5">
            Contextual technique mapping based on statistical feature vectors (not confirmed exploitation)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
            {candidates.length} CANDIDATE MATCHES
          </span>
        </div>
      </div>

      {candidates.length === 0 ? (
        <div className="py-12 text-center rounded-xl bg-slate-950/40 border border-slate-800/60 font-mono text-xs text-slate-500">
          NO ATTACK PATTERNS CURRENTLY EXCEED THE HEURISTIC THRESHOLD
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate, idx) => (
            <MitreTechniqueCard
              key={`${candidate.technique_id}-${candidate.attack_type}`}
              item={candidate}
              index={idx}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default MitrePanel;
