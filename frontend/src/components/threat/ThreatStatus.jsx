import React from 'react';
import { Shield, ShieldAlert, CheckCircle2, AlertOctagon, Info } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useMitre } from '../../hooks/useMitre';
import { useForecast } from '../../hooks/useForecast';

export const ThreatStatus = () => {
  const { forecast } = useForecast();
  const { primaryAttack, candidates } = useMitre();

  const isEarlyWarning = Boolean(forecast?.warning || (forecast?.peak_risk >= 0.05));
  const peakRisk = forecast?.peak_risk ?? 0;

  const severity =
    primaryAttack?.severity ||
    (peakRisk >= 0.20
      ? 'CRITICAL'
      : peakRisk >= 0.10
      ? 'HIGH'
      : peakRisk >= 0.05
      ? 'MEDIUM'
      : 'LOW');

  const severityBadgeClass = {
    CRITICAL: 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  }[severity] || 'bg-slate-800 text-slate-400';

  return (
    <GlassCard className="p-6 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              THREAT INTELLIGENCE STATUS
            </span>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${severityBadgeClass}`}>
            {severity} SEVERITY
          </span>
        </div>

        <div className="mt-2">
          <h2 className="text-xl lg:text-2xl font-black tracking-tight text-white font-mono flex items-center gap-2">
            {primaryAttack ? (
              <>
                <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
                <span>{primaryAttack.attack_type}</span>
              </>
            ) : isEarlyWarning ? (
              <>
                <AlertOctagon className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <span>Suspicious Network Activity Detected</span>
              </>
            ) : (
              <span>Nominal Traffic &middot; No Strong Attack Signature</span>
            )}
          </h2>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {primaryAttack
              ? 'Network behavior matches a heuristic attack pattern. This is contextual evidence, not proof of attack execution.'
              : 'PREVENT-X is continuously forecasting future network risk from the latest 50 seconds of traffic.'}
          </p>
        </div>

        {/* Evidence Checklist */}
        {primaryAttack && Array.isArray(primaryAttack.evidence) && primaryAttack.evidence.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-2 font-bold">
              HEURISTIC EVIDENCE CORRELATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {primaryAttack.evidence.map((evidenceItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{evidenceItem}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>ATT&CK Match: <strong className="text-slate-200">{primaryAttack ? primaryAttack.technique_id : 'NONE'}</strong></span>
        </div>
        <div>
          Candidates: <strong className="text-cyan-400">{candidates.length}</strong>
        </div>
      </div>
    </GlassCard>
  );
};

export default ThreatStatus;
